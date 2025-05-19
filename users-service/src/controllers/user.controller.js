import pool from '../config/pool.js';
import { validationResult } from 'express-validator';
import { findUserByEmail } from '../models/user.model.js';
import { createUser } from '../models/user.model.js';

export const addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { 
      email,
      firstName,
      patronymic,
      lastName,
      dateOfBirth,
      phone,
      region,
      city,
      institute,
      gender,
      class_name} = req.body;

    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }

    const user = await createUser(
      email,
      firstName,
      patronymic,
      lastName,
      dateOfBirth,
      phone,
      region,
      city,
      institute,
      gender,
      class_name);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Такого пользователя не существует' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при получении профиля:', err);
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    const {
      firstName,
      patronymic,
      lastName,
      dateOfBirth,
      phone,
      region,
      city,
      institute,
      gender,
      class_name
    } = req.body;
    
    const result = await pool.query(
      `UPDATE users SET 
        firstName = $1, 
        patronymic = $2, 
        lastName = $3, 
        dateOfBirth = $4, 
        phone = $5, 
        region = $6, 
        city = $7, 
        institute = $8, 
        gender = $9, 
        class_name = $10
      WHERE email = $11
      RETURNING *`,
      [
        firstName,
        patronymic,
        lastName,
        dateOfBirth,
        phone,
        region,
        city,
        institute,
        gender,
        class_name,
        email
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.status(200).json({ 
      message: 'Профиль успешно обновлен',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Ошибка при обновлении профиля:', err);
    next(err);
  }
};