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