const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для логгирования запросов
const logger = require('./logger');

app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
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

// Добавь после других app.get
app.get('/api/info', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid
  });
});

app.get('/api/time', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    unix: Date.now()
  });
});

// Запуск сервера
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
