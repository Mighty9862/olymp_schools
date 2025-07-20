import jwt from 'jsonwebtoken';
import pool from '../config/pool.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Не авторизован: отсутствует токен' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const result = await pool.query(
      'SELECT email FROM users WHERE id = $1',
      [decoded.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }
    
    req.user = { 
      id: decoded.id,
      email: result.rows[0].email 
    };
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Токен истёк. Пожалуйста, войдите снова.' });
    }
    res.status(401).json({ error: 'Недействительный токен' });
  }
};