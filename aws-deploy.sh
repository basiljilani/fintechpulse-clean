#!/bin/bash

# Build the React application
npm run build

# Create S3 bucket
aws s3 mb s3://fintech-pulse-website

# Enable static website hosting
aws s3 website s3://fintech-pulse-website --index-document index.html --error-document index.html

# Upload build files to S3
aws s3 sync dist/ s3://fintech-pulse-website

# Create bucket policy
cat > bucket-policy.json << EOL
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::fintech-pulse-website/*"
        }
    ]
}
EOL

# Apply bucket policy
aws s3api put-bucket-policy --bucket fintech-pulse-website --policy file://bucket-policy.json