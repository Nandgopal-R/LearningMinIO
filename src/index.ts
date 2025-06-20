import express from 'express';
import { createBucketIfNotExists, setPublicBucketPolicy } from './utils/minio_utils';
import imageRoutes from './routes/routes';

const app = express();

// Initialize bucket and policy
async function initializeMinio() {
  try {
    await createBucketIfNotExists();
    await setPublicBucketPolicy(); // Optional, only if using public bucket
    console.log('MinIO initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MinIO:', error);
    process.exit(1);
  }
}

// Middleware and routes
app.use(express.json());
app.use('/api', imageRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initializeMinio();
  console.log(`Server running on http://localhost:${PORT}`);
});
