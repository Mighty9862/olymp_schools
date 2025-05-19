import { publishMessage, consumeMessages } from '../config/rabbitmq.config.js';
import { findUserByEmail, createUser } from '../models/user.model.js';
import { sendPasswordResetEmail } from '../config/email.config.js';

// Публикация сообщений
export const publishUserCreated = async (userData) => {
  await publishMessage('user_created', userData);
};

export const publishPasswordReset = async (email, code) => {
  await publishMessage('password_reset', { email, code });
};

// Обработка сообщений
export const setupMessageConsumers = async () => {
  // Обработка сброса пароля
  await consumeMessages('password_reset', async (data) => {
    try {
      const { email, code } = data;
      await sendPasswordResetEmail(email, code);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Error processing password reset message:', error);
    }
  });
};