import express from "express";
import "dotenv/config";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import routes from "./routes/index.js";
import { connectRabbitMQ } from "./config/rabbitmq.config.js";
import { startNewsConsumers } from "./services/news.service.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 8003;

// Подключаемся к RabbitMQ и запускаем обработчики сообщений
connectRabbitMQ()
  .then(() => startNewsConsumers())
  .catch((err) => {
    console.error("Не удалось подключиться к RabbitMQ:", err);
    process.exit(1);
  });

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Раздача статики из папки /uploads
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api", routes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`Сервис новостей запущен на порту ${PORT}`);
});
