import pool from '../config/pool.js';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, addImageToNews, removeImageFromNews } from '../models/news.model.js';
import { 
  publishNewsCreated, 
  publishNewsUpdated, 
  publishNewsDeleted,
  publishNewsImageAdded,
  publishNewsImageRemoved
} from '../services/message.service.js';

export const getNews = async (req, res, next) => {
  try {
    const news = await getAllNews();
    res.json(news);
  } catch (err) {
    next(err);
  }
};

export const getNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await getNewsById(id);
    
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    res.json(news);
  } catch (err) {
    next(err);
  }
};

export const createNewsItem = async (req, res, next) => {
  try {
    const { title, description, content, images } = req.body;
    
    if (!title || !description || !content) {
      return res.status(400).json({ error: 'Необходимо заполнить все обязательные поля' });
    }
    
    // Вместо прямого создания новости, публикуем сообщение в очередь
    await publishNewsCreated({
      title,
      description,
      content,
      images: images || []
    });
    
    res.status(201).json({ 
      message: 'Новость создается. Она будет доступна в ближайшее время.',
      data: {
        title,
        description,
        content,
        images: images || []
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, content, images } = req.body;
    
    const news = await getNewsById(id);
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    // Вместо прямого обновления новости, публикуем сообщение в очередь
    await publishNewsUpdated({
      id,
      title,
      description,
      content,
      images
    });
    
    res.json({ 
      message: 'Новость обновляется. Изменения будут доступны в ближайшее время.',
      data: {
        id,
        title,
        description,
        content,
        images
      }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const news = await getNewsById(id);
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    // Вместо прямого удаления новости, публикуем сообщение в очередь
    await publishNewsDeleted(id);
    
    res.status(200).json({ 
      message: 'Новость удаляется. Она будет недоступна в ближайшее время.' 
    });
  } catch (err) {
    next(err);
  }
};

export const addImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'URL изображения обязателен' });
    }
    
    const news = await getNewsById(id);
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    // Вместо прямого добавления изображения, публикуем сообщение в очередь
    await publishNewsImageAdded(id, imageUrl);
    
    res.json({ 
      message: 'Изображение добавляется. Оно будет доступно в ближайшее время.',
      data: {
        newsId: id,
        imageUrl
      }
    });
  } catch (err) {
    next(err);
  }
};

export const removeImage = async (req, res, next) => {
  try {
    const { id, imageUrl } = req.params;
    
    const news = await getNewsById(id);
    if (!news) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    // Вместо прямого удаления изображения, публикуем сообщение в очередь
    await publishNewsImageRemoved(id, imageUrl);
    
    res.json({ 
      message: 'Изображение удаляется. Изменения будут доступны в ближайшее время.',
      data: {
        newsId: id,
        imageUrl
      }
    });
  } catch (err) {
    next(err);
  }
};