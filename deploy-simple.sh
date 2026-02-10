#!/bin/bash
set -e

BUCKET_NAME="pdf-extraction-service-1770706737"
REGION="us-west-2"

echo "🚀 Simple AWS Deployment..."
echo ""

# 1. Disable block public access
echo "🔓 Disabling block public access..."
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 2. Set bucket policy for public read
echo "📜 Setting public read policy..."
cat > /tmp/policy.json << POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
  }]
}
POLICY

aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/policy.json

# 3. Enable static website hosting
echo "🌐 Enabling website hosting..."
aws s3 website "s3://$BUCKET_NAME" --index-document index.html

# 4. Upload file
echo "📤 Uploading index.html..."
aws s3 cp index.html "s3://$BUCKET_NAME/index.html" --content-type "text/html"

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo ""
echo "✅ Done!"
echo "🌐 Website URL: $WEBSITE_URL"
echo ""
echo "Testing..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$WEBSITE_URL"
echo ""
echo "💾 Saving info..."
echo "{\"bucket\":\"$BUCKET_NAME\",\"url\":\"$WEBSITE_URL\",\"region\":\"$REGION\"}" > deployment-info.json
