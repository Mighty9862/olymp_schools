import { Router } from 'express';
import userRouter from './user.route.js';

const router = Router();

router.use('/users-service', userRouter);

export default router;