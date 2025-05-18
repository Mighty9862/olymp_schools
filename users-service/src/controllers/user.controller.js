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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existingUser = await findUserByEmail(req.body.email);
  if (!existingUser) {
    return res.status(404).json({ error: 'Такого пользователя не существует' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};