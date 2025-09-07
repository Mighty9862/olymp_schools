import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getMe } from '../controllers/user.controller.js';

const router = Router();

router.get('/me', protect, getMe);

export default router;