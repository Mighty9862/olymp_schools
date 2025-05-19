import express from 'express';
import router from './routes/index.js';
import {ConnectionError, JsonError} from './middlewares/errorHandler.js';
import { connectRabbitMQ } from './config/rabbitmq.config.js';
import { setupMessageConsumers } from './services/message.service.js';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(ConnectionError);
app.use(JsonError);

// Инициализация RabbitMQ
const initializeApp = async () => {
  try {
    await connectRabbitMQ();
    await setupMessageConsumers();
    
    const PORT = process.env.AUTH_SERVICE_PORT || 8001;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error);
    process.exit(1);
  }
};

initializeApp();