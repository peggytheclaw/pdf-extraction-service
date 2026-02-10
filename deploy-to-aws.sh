#!/bin/bash
set -e

# Configuration
BUCKET_NAME="pdf-extraction-service-$(date +%s)"
REGION="us-west-2"

echo "🚀 Deploying PDF Extraction Service to AWS..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo ""

# 1. Create S3 bucket
echo "📦 Creating S3 bucket..."
aws s3api create-bucket \
  --bucket "$BUCKET_NAME" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"

# 2. Configure bucket for static website hosting
echo "🌐 Configuring static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
  --index-document index.html \
  --error-document index.html

# 3. Set bucket policy for public read access
echo "🔓 Setting public read policy..."
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket "$BUCKET_NAME" \
  --policy file:///tmp/bucket-policy.json

# 4. Upload website files
echo "📤 Uploading index.html..."
aws s3 cp index.html "s3://$BUCKET_NAME/index.html" \
  --content-type "text/html" \
  --cache-control "max-age=300"

# 5. Create CloudFront distribution
echo "☁️  Creating CloudFront distribution..."
DISTRIBUTION_CONFIG=$(cat <<EOF
{
  "CallerReference": "pdf-extraction-$(date +%s)",
  "Comment": "PDF Extraction Service",
  "Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
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
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 300,
    "MaxTTL": 86400
  },
  "DefaultRootObject": "index.html",
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
EOF
)

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config "$DISTRIBUTION_CONFIG" \
  --query 'Distribution.Id' \
  --output text)

CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
  --id "$DISTRIBUTION_ID" \
  --query 'Distribution.DomainName' \
  --output text)

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Deployment Info:"
echo "  S3 Bucket: $BUCKET_NAME"
echo "  S3 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "  CloudFront Distribution ID: $DISTRIBUTION_ID"
echo "  CloudFront URL: https://$CLOUDFRONT_DOMAIN"
echo ""
echo "⏳ CloudFront is propagating (takes 15-20 minutes)..."
echo "   You can check status with: aws cloudfront get-distribution --id $DISTRIBUTION_ID"
echo ""
echo "🎯 Next Steps:"
echo "  1. Wait for CloudFront to deploy"
echo "  2. Register your domain tomorrow"
echo "  3. Add CNAME/ALIAS record pointing to: $CLOUDFRONT_DOMAIN"
echo "  4. Update CloudFront with custom domain (alternate domain name)"
echo "  5. Add SSL certificate via AWS Certificate Manager"
echo ""
echo "💾 Saving deployment info..."
cat > deployment-info.json <<DEPLOY_EOF
{
  "bucket": "$BUCKET_NAME",
  "region": "$REGION",
  "s3_url": "http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
  "cloudfront_id": "$DISTRIBUTION_ID",
  "cloudfront_url": "https://$CLOUDFRONT_DOMAIN",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
DEPLOY_EOF

echo "Saved to: deployment-info.json"
