# Чат-бот с гибридным NLP движком 🤖

**Многоязычный ассистент для обработки пользовательских запросов**  
*Сочетание rule-based логики и машинного обучения для оптимальной работы*

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Особенности
- Гибридный алгоритм поиска (Fuzzy + TF-IDF)
- Поддержка опечаток и разного регистра
- Быстрое обучение на небольших данных
- Модульная архитектура
- Легкая интеграция с веб-приложениями

## 🛠 Технологии
| Компонент       | Назначение                          |
|-----------------|-------------------------------------|
| FuzzyWuzzy      | Поиск похожих строк                 |
| TF-IDF          | Семантический поиск                 |
| Natasha         | Лемматизация русских текстов        |
| Scikit-learn    | Векторизация и ML-алгоритмы         |
| Joblib          | Сериализация моделей                |

## 🚀 Быстрый старт

### Установка
```bash
git clone https://github.com/yourusername/olymp_schools.git
cd AI
pip install -r requirements.txt
```

### Структура проекта
```
.
├── data/
│   ├── patterns.csv    # Шаблоны фраз
│   └── responses.csv   # Варианты ответов
├── models/             # Обученные модели
├── train_model.py            # Скрипт обучения
└── chat_model.py             # Интерфейс чата
```

