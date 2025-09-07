import pool from '../config/pool.js';
import { findUserByEmail, updateUserRole } from '../models/user.model.js';

export const getMe = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const makeAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const updatedUser = await updateUserRole(userId, 'admin');
    
    res.status(200).json({ 
      message: 'Пользователь успешно назначен администратором',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (err) {
    next(err);
  }
};