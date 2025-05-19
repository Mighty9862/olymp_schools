import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    // Получаем токен из заголовка
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Не авторизован, токен отсутствует' });
    }

    const token = authHeader.split(' ')[1];

    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Добавляем информацию о пользователе в запрос
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    return res.status(401).json({ error: 'Не авторизован, неверный токен' });
  }
};

export const adminOnly = (req, res, next) => {
  // Проверяем, что пользователь аутентифицирован и имеет роль admin
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ запрещен. Требуются права администратора' });
  }
  
  next();
};