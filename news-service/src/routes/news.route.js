import { Router } from 'express';
import { getNews, getNewsItem, createNewsItem, updateNewsItem, deleteNewsItem, addImage, removeImage } from '../controllers/news.controller.js';
import { uploadImage } from '../controllers/upload.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

// Маршруты для новостей
router.get('/news', protect, getNews);
router.get('/news/:id', protect, getNewsItem);
router.post('/news', protect, adminOnly, createNewsItem);
router.put('/news/:id', protect, adminOnly, updateNewsItem);
router.delete('/news/:id', protect, adminOnly, deleteNewsItem);

// Маршруты для изображений
router.post('/upload', protect, upload.single('image'), uploadImage);
router.post('/news/:id/images', protect, adminOnly, addImage);
router.delete('/news/:id/images/:imageUrl', protect, adminOnly, removeImage);

export default router;