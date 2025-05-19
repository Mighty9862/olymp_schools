import amqp from 'amqplib';

let connection = null;
let channel = null;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    
    await channel.assertQueue('news_created', { durable: true });
    await channel.assertQueue('news_updated', { durable: true });
    await channel.assertQueue('news_deleted', { durable: true });
    await channel.assertQueue('news_image_added', { durable: true });
    await channel.assertQueue('news_image_removed', { durable: true });
    
    console.log('✅ RabbitMQ connected');
    return channel;
  } catch (error) {
    console.error('❌ RabbitMQ connection failed:', error);
    process.exit(1);
  }
};

export const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

export const publishMessage = async (queue, message) => {
  try {
    const ch = getChannel();
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
    console.log(`Message sent to ${queue}`);
  } catch (error) {
    console.error(`Error publishing message to ${queue}:`, error);
    throw error;
  }
};

export const consumeMessages = async (queue, callback) => {
  try {
    const ch = getChannel();
    await ch.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        ch.ack(msg);
      }
    });
    console.log(`Consumer started for queue: ${queue}`);
  } catch (error) {
    console.error(`Error consuming messages from ${queue}:`, error);
    throw error;
  }
};

export const closeConnection = async () => {
  if (channel) await channel.close();
  if (connection) await connection.close();
  console.log('RabbitMQ connection closed');
};

process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});