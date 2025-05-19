import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addUser, getUser, updateProfile } from '../controllers/user.controller.js';

const router = Router();

router.post('/addUser', protect, addUser);
router.get('/profile', protect, getUser); // Изменено с getUser на profile
router.put('/updateProfile', protect, updateProfile);

export default router;