# Базовый образ: Node.js 20 на Alpine Linux
# Alpine - минималистичный дистрибутив (~5 МБ)
FROM node:20-alpine

# Создаём пользователя node (он уже есть в образе) для безопасности
# Работать от root - плохая практика
USER node

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json ПЕРВЫМИ
# Это важно для кэширования слоёв Docker!
# Если зависимости не изменились, Docker не будет ставить их заново
COPY --chown=node:node package*.json ./

# Устанавливаем зависимости (только production)
# npm ci вместо npm install:
# - быстрее
# - детерминированный результат (всегда одинаковый)
# - требует package-lock.json
# - очищает node_modules перед установкой
RUN npm ci --only=production

# Копируем исходный код приложения
COPY --chown=node:node src/ ./src/

# Указываем, какой порт использует приложение
# Это документация, не проброс порта!
EXPOSE 3000

# Переменные окружения по умолчанию
ENV NODE_ENV=production
ENV PORT=3000

# Команда, которая запустится при старте контейнера
CMD ["node", "src/index.js"]
