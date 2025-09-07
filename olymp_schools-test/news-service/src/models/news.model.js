import pool from '../config/pool.js';

export const getAllNews = async () => {
  const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
  return result.rows;
};

export const getNewsById = async (id) => {
  const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
  return result.rows[0];
};

export const createNews = async (title, description, content, images = []) => {
  const result = await pool.query(
    'INSERT INTO news (title, description, content, images) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, content, images]
  );
  return result.rows[0];
};

export const updateNews = async (id, title, description, content, images) => {
  const result = await pool.query(
    'UPDATE news SET title = $1, description = $2, content = $3, images = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
    [title, description, content, images, id]
  );
  return result.rows[0];
};

export const deleteNews = async (id) => {
  await pool.query('DELETE FROM news WHERE id = $1', [id]);
};

export const addImageToNews = async (id, imageUrl) => {
  const news = await getNewsById(id);
  
  const images = news.images || [];
  
  if (!images.includes(imageUrl)) {
    images.push(imageUrl);
  }
  
  const result = await pool.query(
    'UPDATE news SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [images, id]
  );
  
  return result.rows[0];
};

export const removeImageFromNews = async (id, imageUrl) => {
  const news = await getNewsById(id);

  if (!news.images || news.images.length === 0) {
    return news;
  }
  
  const images = news.images.filter(img => img !== imageUrl);
  
  const result = await pool.query(
    'UPDATE news SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [images, id]
  );
  
  return result.rows[0];
};