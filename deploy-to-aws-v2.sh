#!/bin/bash
set -e

# Configuration
BUCKET_NAME="pdf-extraction-service-$(date +%s)"
REGION="us-west-2"

echo "🚀 Deploying PDF Extraction Service to AWS..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo ""

# 1. Create S3 bucket (already done, let's use the existing one)
BUCKET_NAME="pdf-extraction-service-1770706737"
echo "📦 Using existing bucket: $BUCKET_NAME"

# 2. Upload website files (no public access needed - CloudFront will handle it)
echo "📤 Uploading index.html..."
aws s3 cp index.html "s3://$BUCKET_NAME/index.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "max-age=300"

# 3. Create CloudFront Origin Access Control
echo "🔐 Creating Origin Access Control..."
OAC_CONFIG=$(cat <<EOF
{
  "Name": "pdf-extraction-oac-$(date +%s)",
  "Description": "OAC for PDF Extraction Service",
  "SigningProtocol": "sigv4",
  "SigningBehavior": "always",
  "OriginAccessControlOriginType": "s3"
}
EOF
)

OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config "$OAC_CONFIG" \
  --query 'OriginAccessControl.Id' \
  --output text 2>/dev/null || echo "")

if [ -z "$OAC_ID" ]; then
  echo "⚠️  OAC creation failed or already exists, trying without OAC..."
  # Fall back to simple CloudFront without OAC
  OAC_ENABLED="false"
else
  echo "✅ OAC created: $OAC_ID"
  OAC_ENABLED="true"
fi

# 4. Create CloudFront distribution (simplified for static site)
echo "☁️  Creating CloudFront distribution..."

# Simple distribution config that works
aws cloudfront create-distribution --cli-input-json '{
  "DistributionConfig": {
    "CallerReference": "pdf-extraction-'$(date +%s)'",
    "Comment": "PDF Extraction Service",
    "Enabled": true,
    "Origins": {
      "Quantity": 1,
      "Items": [
        {
          "Id": "S3-'$BUCKET_NAME'",
          "DomainName": "'$BUCKET_NAME'.s3.'$REGION'.amazonaws.com",
          "S3OriginConfig": {
            "OriginAccessIdentity": ""
          }
        }
      ]
    },
    "DefaultRootObject": "index.html",
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-'$BUCKET_NAME'",
      "ViewerProtocolPolicy": "redirect-to-https",
      "AllowedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"],
        "CachedMethods": {
          "Quantity": 2,
          "Items": ["GET", "HEAD"]
        }
      },
      "Compress": true,
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {"Forward": "none"},
        "Headers": {"Quantity": 0}
      },
      "MinTTL": 0,
      "DefaultTTL": 300,
      "MaxTTL": 86400,
      "TrustedSigners": {
        "Enabled": false,
        "Quantity": 0
      }
    },
    "CustomErrorResponses": {
      "Quantity": 1,
      "Items": [
        {
          "ErrorCode": 404,
          "ResponsePagePath": "/index.html",
          "ResponseCode": "200",
          "ErrorCachingMinTTL": 300
        }
      ]
    }
  }
}' > /tmp/cf-output.json

DISTRIBUTION_ID=$(cat /tmp/cf-output.json | grep -o '"Id": "[^"]*"' | head -1 | cut -d'"' -f4)
CLOUDFRONT_DOMAIN=$(cat /tmp/cf-output.json | grep -o '"DomainName": "[^"]*"' | head -1 | cut -d'"' -f4)

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Deployment Info:"
echo "  S3 Bucket: $BUCKET_NAME"
echo "  CloudFront Distribution ID: $DISTRIBUTION_ID"
echo "  CloudFront URL: https://$CLOUDFRONT_DOMAIN"
echo ""
echo "⏳ CloudFront is propagating (takes 15-20 minutes)..."
echo ""
echo "🎯 Next Steps:"
echo "  1. Wait for CloudFront to deploy"
echo "  2. Register your domain tomorrow"
echo "  3. Add CNAME/ALIAS record pointing to: $CLOUDFRONT_DOMAIN"
echo ""
echo "💾 Saving deployment info..."
cat > deployment-info.json <<DEPLOY_EOF
{
  "bucket": "$BUCKET_NAME",
  "region": "$REGION",
  "cloudfront_id": "$DISTRIBUTION_ID",
  "cloudfront_url": "https://$CLOUDFRONT_DOMAIN",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
DEPLOY_EOF

echo "Saved to: deployment-info.json"
