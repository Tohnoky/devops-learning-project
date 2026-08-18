const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для логгирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js DevOps Project!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Healthcheck endpoint (важно для Docker и мониторинга!)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Запуск сервера
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
