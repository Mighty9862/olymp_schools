import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import router from "./routes/index.js";
import { connectRabbitMQ } from "./config/rabbitmq.config.js";
import { setupMessageConsumers } from "./services/message.service.js";

const app = express();

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use("/api", router);

const initializeApp = async () => {
  try {
    await connectRabbitMQ();
    await setupMessageConsumers();

    const PORT = process.env.USERS_SERVICE_PORT || 8002;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при инициализации приложения:", error);
    process.exit(1);
  }
};

initializeApp();
