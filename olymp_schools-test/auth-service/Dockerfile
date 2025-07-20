FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN npm ci --only=production

COPY . .

EXPOSE 8001

CMD ["node", "src/app.js"]