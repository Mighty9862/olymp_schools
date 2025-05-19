import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { 
  findUserByEmail, 
  createUser, 
  createPasswordResetCode, 
  findResetCode, 
  updateUserPassword, 
  deleteResetCode 
} from '../models/user.model.js';
import { publishUserCreated, publishPasswordReset } from '../services/message.service.js';

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, ...userData } = req.body;
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }

    const user = await createUser(email, password);
    
    await publishUserCreated({
      email
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(200).json({ message: 'Если пользователь существует, на указанный email будет отправлен код сброса пароля' });
    }
    
    const code = await createPasswordResetCode(user.id);

    await publishPasswordReset(email, code);
    
    res.status(200).json({ message: 'Код сброса пароля отправлен на указанный email' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { code, password } = req.body;
    
    const resetCode = await findResetCode(code);
    if (!resetCode) {
      return res.status(400).json({ error: 'Недействительный или истекший код сброса пароля' });
    }
    
    await updateUserPassword(resetCode.user_id, password);
    await deleteResetCode(code);
    
    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (err) {
    next(err);
  }
};