import pool from '../config/pool.js';
import bcrypt from 'bcryptjs';
import { generateResetCode } from '../middlewares/password_reset.middleware.js'

export const createUser = async (email, password, role = 'user') => {
  // Проверяем, есть ли уже пользователи в системе
  const countResult = await pool.query('SELECT COUNT(*) FROM users');
  const userCount = parseInt(countResult.rows[0].count);
  
  // Если пользователей нет, то первый становится админом
  const userRole = userCount === 0 ? 'admin' : role;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
    [email, hashedPassword, userRole]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createPasswordResetCode = async (userId) => {
  const code = generateResetCode();
  const expiresAt = new Date(Date.now() + 3600000); // 1 час
  
  await pool.query(
    `INSERT INTO password_reset_codes (user_id, code, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, code, expiresAt]
  );
  
  return code;
};

export const findResetCode = async (code) => {
  const { rows } = await pool.query(
    `SELECT * FROM password_reset_codes
     WHERE code = $1 AND expires_at > NOW()`,
    [code]
  );
  return rows[0];
};

export const updateUserPassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    `UPDATE users SET password_hash = $1 WHERE id = $2`,
    [hashedPassword, userId]
  );
};

export const updateUserRole = async (userId, role) => {
  const result = await pool.query(
    'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
    [role, userId]
  );
  return result.rows[0];
};

export const deleteResetCode = async (code) => {
  await pool.query(
    `DELETE FROM password_reset_codes WHERE code = $1`,
    [code]
  );
};