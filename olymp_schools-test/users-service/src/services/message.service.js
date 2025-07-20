import { publishMessage, consumeMessages } from '../config/rabbitmq.config.js';
import pool from '../config/pool.js';

export const publishUserUpdated = async (userData) => {
  await publishMessage('user_updated', userData);
};

export const setupMessageConsumers = async () => {
  await consumeMessages('user_created', async (userData) => {
    try {
      const { 
        email,
        firstName = "Новый пользователь",
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
      
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows.length === 0) {
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