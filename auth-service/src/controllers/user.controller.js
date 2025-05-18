import pool from '../config/pool.js';

export const getMe = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, email FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};