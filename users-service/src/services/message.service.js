import { publishMessage, consumeMessages } from '../config/rabbitmq.config.js';
import pool from '../config/pool.js';

// Публикация сообщений
export const publishUserUpdated = async (userData) => {
  await publishMessage('user_updated', userData);
};

// Обработка сообщений
export const setupMessageConsumers = async () => {
  // Обработка создания пользователя
  await consumeMessages('user_created', async (userData) => {
    try {
      const { 
        email,
        firstName = "Новый пользователь",  // Значение по умолчанию
        patronymic = "",
        lastName = "",
        dateOfBirth = new Date().toISOString().split('T')[0],
        phone = "",
        region = "",
        city = "",
        institute = "",
        gender = "",
        class_name = ""
      } = userData;
      
      // Проверяем, существует ли пользователь
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows.length === 0) {
        // Создаем пользователя
        await pool.query(
          `INSERT INTO users(
            email, firstName, patronymic, lastName, dateOfBirth, 
            phone, region, city, institute, gender, class_name
          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            email, firstName, patronymic, lastName, dateOfBirth,
            phone, region, city, institute, gender, class_name
          ]
        );
        console.log(`Пользователь создан в users-service: ${email}`);
      } else {
        console.log(`Пользователь уже существует в users-service: ${email}`);
      }
    } catch (error) {
      console.error('Ошибка при обработке сообщения user_created:', error);
    }
  });
};