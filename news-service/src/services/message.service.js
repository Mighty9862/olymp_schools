import { publishMessage } from '../config/rabbitmq.config.js';

export const publishNewsCreated = async (news) => {
  await publishMessage('news_created', news);
};

export const publishNewsUpdated = async (news) => {
  await publishMessage('news_updated', news);
};

export const publishNewsDeleted = async (newsId) => {
  await publishMessage('news_deleted', { id: newsId });
};

export const publishNewsImageAdded = async (newsId, imageUrl) => {
  await publishMessage('news_image_added', { newsId, imageUrl });
};

export const publishNewsImageRemoved = async (newsId, imageUrl) => {
  await publishMessage('news_image_removed', { newsId, imageUrl });
};