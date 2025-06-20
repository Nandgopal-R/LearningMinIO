# LearningMinIO

A TypeScript-based Express server for learning how to integrate MinIO for image uploads and retrieval. Uses Multer for file handling and MinIO for object storage.

## Set Up MinIO 
```bash
mkdir data
docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/dev/learning/learning_minio/data:/data \
   -e "MINIO_ROOT_USER=ROOTNAME" \
   -e "MINIO_ROOT_PASSWORD=CHANGEME123" \
   quay.io/minio/minio server /data --console-address ":9001"
