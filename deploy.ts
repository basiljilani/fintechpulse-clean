import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const BUCKET_NAME = "fintech-pulse-website";

async function uploadFile(filePath: string, bucketPath: string) {
  const fileContent = readFileSync(filePath);
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: bucketPath,
    Body: fileContent,
    ContentType: getContentType(filePath)
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully uploaded ${filePath} to ${bucketPath}`);
  } catch (err) {
    console.error(`Error uploading ${filePath}:`, err);
  }
}

function getContentType(filePath: string): string {
  const ext = extname(filePath);
  const contentTypes: { [key: string]: string } = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  return contentTypes[ext] || 'application/octet-stream';
}

async function uploadDirectory(dirPath: string) {
  const files = readdirSync(dirPath, { recursive: true }) as string[];

  for (const file of files) {
    const filePath = join(dirPath, file);
    const bucketPath = file;
    await uploadFile(filePath, bucketPath);
  }
}

async function deployToS3() {
  console.log('Starting deployment to S3...');
  const buildDir = join(__dirname, 'dist');
  
  try {
    await uploadDirectory(buildDir);
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deployToS3();