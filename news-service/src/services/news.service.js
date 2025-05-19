import { consumeMessages } from '../config/rabbitmq.config.js';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, addImageToNews, removeImageFromNews } from '../models/news.model.js';

export const startNewsConsumers = async () => {
  // Обработчик создания новости
  await consumeMessages('news_created', async (message) => {
    console.log('Получено сообщение о создании новости:', message);
    try {
      const { title, description, content, images } = message;
      await createNews(title, description, content, images || []);
      console.log('Новость успешно создана');
    } catch (error) {
      console.error('Ошибка при создании новости:', error);
    }
  });

  // Обработчик обновления новости
  await consumeMessages('news_updated', async (message) => {
    console.log('Получено сообщение об обновлении новости:', message);
    try {
      const { id, title, description, content, images } = message;
      await updateNews(id, title, description, content, images);
      console.log(`Новость с ID ${id} успешно обновлена`);
    } catch (error) {
      console.error('Ошибка при обновлении новости:', error);
    }
  });

  // Обработчик удаления новости
  await consumeMessages('news_deleted', async (message) => {
    console.log('Получено сообщение об удалении новости:', message);
    try {
      const { id } = message;
      await deleteNews(id);
      console.log(`Новость с ID ${id} успешно удалена`);
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
    }
  });

  // Обработчик добавления изображения
  await consumeMessages('news_image_added', async (message) => {
    console.log('Получено сообщение о добавлении изображения:', message);
    try {
      const { newsId, imageUrl } = message;
      await addImageToNews(newsId, imageUrl);
      console.log(`Изображение ${imageUrl} успешно добавлено к новости ${newsId}`);
    } catch (error) {
      console.error('Ошибка при добавлении изображения:', error);
    }
  });

  // Обработчик удаления изображения
  await consumeMessages('news_image_removed', async (message) => {
    console.log('Получено сообщение об удалении изображения:', message);
    try {
      const { newsId, imageUrl } = message;
      await removeImageFromNews(newsId, imageUrl);
      console.log(`Изображение ${imageUrl} успешно удалено из новости ${newsId}`);
    } catch (error) {
      console.error('Ошибка при удалении изображения:', error);
    }
  });

  console.log('Все обработчики сообщений для новостей запущены');
};