# 🏆 Олимпиадный сайт (Клиентская часть)

Этот репозиторий содержит код клиентской части сайта олимпиады для школьников с интеграцией умного чат-бота помощника.

## 🚀 Стек технологий

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
<img src='https://img.shields.io/badge/Zustand-FBA433?style=for-the-badge&logoColor=white' alt="Zustand"/>
  <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' alt="React-router-dom"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
<img src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white' alt="JWT"/>
<img src='https://img.shields.io/badge/Tailwind_CSS-black?style=for-the-badge&logo=tailwind-css&logoColor=blue' alt="tailwindcss">
  <img src='https://img.shields.io/badge/Framer motion-black?style=for-the-badge&logo=framer&logoColor=white' alt="Framer-motion"/>
  <img src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=Vitest&logoColor=%23fcd703" alt="Vitest" />
</p>

## 🔧 Установка и запуск

### 1️⃣ Установка зависимостей

```sh
npm install
```

### 2️⃣ Запуск проекта в режиме разработки

```sh
npm run dev
```

### 3️⃣ Сборка проекта

```sh
npm run build
```

## 🌟 Основные функции

- 🔑 **Регистрация и авторизация** пользователя при помощи **React Hook Form** с использованием **JWT** токенов
- 📊 **Просмотр рейтинга** пользователей с общим количеством полученных баллов
- 📂 **Просмотр проектов** пользователей
- 📰 **Адаптивная новостная колонка** с возможностью редактирования и добавления мультимедиа
- 🤖 **Интерактивное взаимодействие** с чат-ботом-помощником

## 📂 Структура проекта

```
/src
│── api/           # API-запросы (Axios)
│── app/               # Основное приложение
│   │── components/    # Переиспользуемые компоненты
│   │   │── animations/       # Анимации
│   │   │── layout/           # Компоненты для макета
│   │   │── ui/               # UI-компоненты
│   │       │── Button.tsx    # Компонент кнопки
│   │       │── BackgroundBlobs/  # Анимационные фоны
│   │── hooks/         # Пользовательские хуки
│   │── pages/         # Страницы приложения
│   │   │── Home/      # Главная страница
│   │   │── Login.tsx          # Страница входа
│   │   │── Registration.tsx   # Страница регистрации
│   │   │── Profile.tsx        # Профиль пользователя
│   │   │── Rankings.tsx       # Рейтинг пользователей
│   │   │── Olympiads.tsx      # Страница олимпиад
│   │   │── Settings.tsx       # Страница настроек
│   │── App.tsx        # Основной компонент приложения с роутами (React-router-dom)
│   │── stores/        # Глобальное состояние (Zustand)
│   │── assets/        # Медиафайлы и стили
│── main.tsx           # Точка входа
```
