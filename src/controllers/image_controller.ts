import { Request, Response } from 'express';
import minioClient from '../config/minio_client';
import { getImageUrl } from '../utils/minio_utils';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const bucketName = process.env.MINIO_BUCKET || 'my-image-bucket';

export async function uploadImage(req: Request & { file?: Express.Multer.File }, res: any) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

    await minioClient.fPutObject(bucketName, fileName, file.path, {
      'Content-Type': file.mimetype,
    });

    await fs.unlink(file.path);

    const fileUrl = `http://localhost:9000/${bucketName}/${fileName}`;
    res.json({ message: 'File uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}

export async function getImage(req: Request, res: Response) {
  try {
    const url = await getImageUrl(req.params.objectName);
    res.json({ url });
  } catch (error) {
    console.error('Error getting image URL:', error);
    res.status(500).json({ error: 'Failed to get image URL' });
  }
}
