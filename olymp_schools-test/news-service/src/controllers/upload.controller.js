import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(process.cwd(), 'uploads');

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не был загружен' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({ 
      success: true, 
      imageUrl: imageUrl,
      message: 'Изображение успешно загружено' 
    });
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    res.status(500).json({ error: 'Ошибка при загрузке изображения' });
  }
};

export const getImagesList = async (req, res) => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    const imageUrls = files.map(filename => `/uploads/${filename}`);
    
    res.json({ images: imageUrls });
  } catch (err) {
    console.error('Ошибка при получении списка изображений:', err);
    res.status(500).json({ error: 'Не удалось получить список изображений' });
  }
};
