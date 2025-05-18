import { Router } from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post('/register', 
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 4 }),
  register
);

router.post('/login', login);

router.post('/forgot-password', 
  body('email').isEmail().normalizeEmail(),
  requestPasswordReset
);

router.post('/reset-password',
  body('code').isLength({ min: 8, max: 8 }).withMessage('Код должен содержать 8 символов'),
  body('password').isLength({ min: 4 }),
  resetPassword
);
export default router;