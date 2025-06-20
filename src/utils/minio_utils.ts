import minioClient from '../config/minio_client';

const bucketName = process.env.MINIO_BUCKET || 'my-image-bucket';

export async function createBucketIfNotExists() {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket ${bucketName} created successfully.`);
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
}

export async function setPublicBucketPolicy() {
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: '*' },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log(`Public policy set for bucket ${bucketName}`);
  } catch (error) {
    console.error('Error setting bucket policy:', error);
    throw error;
  }
}

export async function getImageUrl(objectName: string): Promise<string> {
  try {
    const url = await minioClient.presignedGetObject(bucketName, objectName, 3600);
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}
