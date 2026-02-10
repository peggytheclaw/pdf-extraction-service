#!/bin/bash
set -e

BUCKET_NAME="pdf-extraction-service-1770706737"
REGION="us-west-2"
S3_WEBSITE_ENDPOINT="$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo "☁️  Creating CloudFront distribution..."

# Create distribution
DIST_OUTPUT=$(aws cloudfront create-distribution \
  --origin-domain-name "$S3_WEBSITE_ENDPOINT" \
  --default-root-object index.html \
  --query '{Id:Distribution.Id,Domain:Distribution.DomainName,Status:Distribution.Status}' \
  --output json)

echo "$DIST_OUTPUT" | jq .

DIST_ID=$(echo "$DIST_OUTPUT" | jq -r .Id)
DIST_DOMAIN=$(echo "$DIST_OUTPUT" | jq -r .Domain)

echo ""
echo "✅ CloudFront Created!"
echo "Distribution ID: $DIST_ID"
echo "Domain: https://$DIST_DOMAIN"
echo ""
echo "⏳ Deployment status: InProgress (takes 15-20 min)"
echo ""

# Save to deployment info
cat > deployment-info.json << DEPLOY
{
  "bucket": "$BUCKET_NAME",
  "region": "$REGION",
  "s3_url": "http://$S3_WEBSITE_ENDPOINT",
  "cloudfront_id": "$DIST_ID",
  "cloudfront_url": "https://$DIST_DOMAIN",
  "status": "deploying",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
DEPLOY

echo "Saved to deployment-info.json"
