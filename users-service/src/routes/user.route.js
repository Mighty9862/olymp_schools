import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addUser } from '../controllers/user.controller.js';
import { getUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/addUser', protect, addUser);
router.get('/getUser', protect, getUser);

export default router;