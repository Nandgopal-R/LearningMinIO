import express from 'express';
import multer from 'multer';
import { uploadImage, getImage } from '../controllers/image_controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/image/:objectName', getImage);

export default router;
