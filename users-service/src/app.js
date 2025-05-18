import express from 'express';
import router from './routes/index.js';
import {ConnectionError, JsonError} from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(ConnectionError);
app.use(JsonError);

const PORT = process.env.USERS_SERVICE_PORT || 8002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});