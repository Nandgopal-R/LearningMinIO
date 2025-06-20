import * as Minio from 'minio';
import * as dotenv from 'dotenv';

dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'ROOTNAME',
  secretKey: process.env.MINIO_SECRET_KEY || 'CHANGEME123',
});

export default minioClient;
