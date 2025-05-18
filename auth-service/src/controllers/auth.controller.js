import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, createPasswordResetCode, findResetCode,  updateUserPassword, deleteResetCode} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { sendPasswordResetEmail } from '../config/email.config.js';

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }

    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await findUserByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    const code = await createPasswordResetCode(user.id);
    await sendPasswordResetEmail(user.email, code);

    res.json({ message: 'Если указанный email зарегистрирован, на него отправлена инструкция по восстановлению пароля' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { code, password } = req.body;
    
    const resetCode = await findResetCode(code);
    if (!resetCode) {
      return res.status(400).json({ error: 'Неверный или истекший код' });
    }

    await updateUserPassword(resetCode.user_id, password);
    await deleteResetCode(code);

    res.json({ message: 'Пароль успешно изменен' });
  } catch (err) {
    next(err);
  }
};