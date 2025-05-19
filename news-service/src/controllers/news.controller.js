import pool from '../config/pool.js';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews, addImageToNews, removeImageFromNews } from '../models/news.model.js';

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
    
    const news = await createNews(title, description, content, images || []);
    res.status(201).json(news);
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
    
    const updatedNews = await updateNews(id, title, description, content, images);
    res.json(updatedNews);
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
    
    await deleteNews(id);
    res.status(204).send();
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
    
    const updatedNews = await addImageToNews(id, imageUrl);
    res.json(updatedNews);
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
    
    const updatedNews = await removeImageFromNews(id, imageUrl);
    res.json(updatedNews);
  } catch (err) {
    next(err);
  }
};