# 🚀 DevOps Learning Project

[![CI Pipeline](https://github.com/Tohnoky/devops-learning-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Tohnoky/devops-learning-project/actions/workflows/ci.yml)
[![Publish and Deploy](https://github.com/Tohnoky/devops-learning-project/actions/workflows/publish.yml/badge.svg)](https://github.com/Tohnoky/devops-learning-project/actions/workflows/publish.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Полноценный учебный проект, демонстрирующий **полный цикл DevOps**: от написания кода до автоматического деплоя на продакшен-сервер с HTTPS.

## 🌐 Live Demo

**https://testdevopsproject.duckdns.org**

---

## 🏗️ Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                              │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS (443)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Nginx (Reverse Proxy + SSL)                      │
│  • SSL/TLS termination (Let's Encrypt)                       │
│  • HTTP → HTTPS redirect                                     │
│  • Static files serving                                      │
│  • Load balancing ready                                      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP (3000)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Node.js Application (Express)                    │
│  • RESTful API                                               │
│  • Health checks                                             │
│  • Structured logging                                        │
│  • Environment-based configuration                           │
└─────────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
┌──────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────┐
│ git push │───▶│ GitHub       │───▶│ Build &     │───▶│ Deploy   │
│ to main  │    │ Actions      │    │ Push to     │    │ to VPS   │
│          │    │ (Tests)      │    │ GHCR        │    │ via SSH  │
└──────────┘    └──────────────┘    └─────────────┘    └──────────┘
```

1. Developer pushes code to `main` branch
2. GitHub Actions runs automated tests
3. Docker image is built and pushed to GitHub Container Registry
4. Deployment workflow connects to VPS via SSH
5. New image is pulled and containers are restarted
6. Zero-downtime deployment complete! ✅

---

## 🛠️ Технологический стек

### Backend
- **Runtime:** Node.js 20 (LTS)
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **Code Quality:** ESLint

### Infrastructure
- **Web Server:** Nginx 1.31 (Alpine)
- **Containerization:** Docker + Docker Compose
- **SSL/TLS:** Let's Encrypt (auto-renewal)
- **DNS:** DuckDNS (dynamic DNS)

### CI/CD
- **Platform:** GitHub Actions
- **Registry:** GitHub Container Registry (GHCR)
- **Deployment:** SSH-based deployment
- **Automation:** Bash scripts

### Server
- **OS:** Ubuntu 24.04 LTS
- **Security:** SSH keys, UFW firewall, Fail2ban
- **Monitoring:** Health check endpoints

---

## 📋 API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/` | Welcome message | JSON with timestamp |
| `GET` | `/health` | Health check endpoint | `{ status: "healthy", uptime: ... }` |
| `GET` | `/api/info` | System information | Node version, platform, PID |
| `GET` | `/api/time` | Current timestamp | ISO timestamp + Unix time |

### Example Responses

**Health Check:**
```bash
curl https://testdevopsproject.duckdns.org/health
```
```json
{
  "status": "healthy",
  "uptime": 3600.123,
  "timestamp": "2026-08-19T08:52:14.000Z"
}
```

**System Info:**
```bash
curl https://testdevopsproject.duckdns.org/api/info
```
```json
{
  "nodeVersion": "v20.20.2",
  "platform": "linux",
  "arch": "x64",
  "pid": 1
}
```

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 20+
- Docker & Docker Compose
- Git

### Локальная разработка

```bash
# 1. Клонируй репозиторий
git clone https://github.com/Tohnoky/devops-learning-project.git
cd devops-learning-project

# 2. Установи зависимости
npm install

# 3. Запусти тесты
npm test

# 4. Запусти в режиме разработки (с auto-reload)
npm run dev

# 5. Открой http://localhost:3000
```

### Запуск через Docker (один контейнер)

```bash
# Собрать образ
docker build -t devops-app:latest .

# Запустить контейнер
docker run -d \
  --name devops-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  devops-app:latest

# Проверить
curl http://localhost:3000/health
```

### Запуск через Docker Compose (полный стек)

```bash
# Запустить все сервисы (app + nginx)
docker compose up -d

# Просмотр логов
docker compose logs -f

# Просмотр статуса
docker compose ps

# Остановить
docker compose down
```

После запуска:
- **Приложение:** http://localhost:3000
- **Через Nginx:** http://localhost

---

## 🔄 CI/CD Pipeline

Проект использует **GitHub Actions** для полной автоматизации.

### Workflow 1: CI Pipeline

**Файл:** `.github/workflows/ci.yml`

**Триггеры:**
- Push в `main`
- Pull Request в `main`

**Шаги:**
1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies (`npm ci`)
4. ✅ Run tests (`npm test`)

### Workflow 2: Publish and Deploy

**Файл:** `.github/workflows/publish.yml`

**Триггер:**
- Push в `main` (после успешного CI)

**Шаги:**
1. 🐳 Build Docker image
2. 📦 Push to GitHub Container Registry
3. 🔐 SSH to VPS
4. 🔄 Pull new image
5. 🚀 Restart containers
6. ✅ Health check verification

**Секреты (GitHub Secrets):**
- `VPS_HOST` - IP адрес сервера
- `VPS_USER` - SSH пользователь
- `VPS_SSH_KEY` - Приватный SSH ключ

---

## 📁 Структура проекта

```
devops-learning-project/
├── src/                          # Исходный код приложения
│   ├── app.js                   # Express application
│   ├── index.js                 # Entry point
│   └── logger.js                # Логирование
│
├── tests/                        # Тесты
│   └── app.test.js              # API tests (Jest + Supertest)
│
├── nginx/                        # Nginx конфигурация
│   ├── nginx.conf               # Main config
│   └── conf.d/
│       └── default.conf         # Server blocks (HTTP/HTTPS)
│
├── public/                       # Статические файлы
│   └── index.html               # Landing page
│
├── scripts/                      # Bash-скрипты автоматизации
│   ├── backup.sh                # Backup utility
│   ├── health.sh                # System health check
│   └── api-test.sh              # API testing script
│
├── .github/
│   └── workflows/               # CI/CD workflows
│       ├── ci.yml               # Continuous Integration
│       └── publish.yml          # Build + Deploy
│
├── Dockerfile                    # Docker образ (multi-stage)
├── docker-compose.yml           # Multi-container setup
├── .dockerignore                # Docker ignore patterns
├── .gitignore                   # Git ignore patterns
├── package.json                 # Dependencies & scripts
├── package-lock.json            # Locked dependencies
└── README.md                    # This file
```

---

## 🔒 Безопасность

### SSH Access
- ✅ **Password authentication disabled** - только SSH ключи
- ✅ **Root login disabled** - используется пользователь `deploy`
- ✅ **Fail2ban** - защита от brute-force атак

### Firewall (UFW)
```bash
# Открытые порты:
22/tcp    # SSH (только по ключам)
80/tcp    # HTTP (redirect на HTTPS)
443/tcp   # HTTPS
```

### HTTPS/SSL
- ✅ **Let's Encrypt** - бесплатный SSL сертификат
- ✅ **Auto-renewal** - автоматическое продление через cron
- ✅ **HSTS** - `Strict-Transport-Security: max-age=63072000`
- ✅ **HTTP → HTTPS redirect** - все запросы перенаправляются
- ✅ **Modern TLS** - только TLS 1.2 и 1.3

### Docker Security
- ✅ **Non-root user** - контейнеры работают от пользователя `node`
- ✅ **Read-only volumes** - конфиги монтируются как read-only
- ✅ **Minimal images** - Alpine Linux для меньшего attack surface
- ✅ **No secrets in code** - все секреты через environment variables

---

## 🌐 Доступ

### Production URL

**https://testdevopsproject.duckdns.org**

### API Testing

```bash
# Главная страница
curl https://testdevopsproject.duckdns.org

# Health check (для мониторинга)
curl https://testdevopsproject.duckdns.org/health

# System information
curl https://testdevopsproject.duckdns.org/api/info

# Current timestamp
curl https://testdevopsproject.duckdns.org/api/time

# Проверка HTTP → HTTPS redirect
curl -I http://testdevopsproject.duckdns.org
# HTTP/1.1 301 Moved Permanently
# Location: https://testdevopsproject.duckdns.org/
```

### SSL Certificate Details

- **Provider:** Let's Encrypt
- **Domain:** testdevopsproject.duckdns.org
- **Auto-renewal:** Cron job runs daily at 3:00 AM
- **Certificate path:** `/etc/letsencrypt/live/testdevopsproject.duckdns.org/`
- **HSTS:** Enabled (2 years max-age)

---

## 📊 Мониторинг

### Health Check Endpoint

```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600.123,
  "timestamp": "2026-08-19T08:52:14.000Z"
}
```

Используется для:
- ✅ Docker health checks
- ✅ Load balancer health checks
- ✅ External monitoring services (UptimeRobot, Pingdom)
- ✅ Kubernetes liveness/readiness probes

### Логи

```bash
# Логи приложения
docker compose logs -f app

# Логи Nginx
docker compose logs -f nginx

# Access logs (в контейнере)
docker compose exec nginx tail -f /var/log/nginx/access.log

# Error logs
docker compose exec nginx tail -f /var/log/nginx/error.log
```

### Метрики (в разработке)

Планируется добавить:
- Prometheus metrics endpoint
- Grafana dashboards
- Alerting rules

---

## 🎯 Что я изучил

Этот проект охватывает **полный спектр DevOps-навыков**:

### Linux Administration
- ✅ File system navigation and management
- ✅ User and permission management
- ✅ Process management (systemd)
- ✅ Network configuration and troubleshooting
- ✅ SSH key-based authentication
- ✅ Firewall configuration (UFW)
- ✅ Log analysis and monitoring

### Bash Scripting
- ✅ Shell scripting basics
- ✅ Variables, conditions, loops
- ✅ Error handling (`set -e`)
- ✅ Automation scripts
- ✅ Cron jobs

### Version Control (Git)
- ✅ Branching strategies
- ✅ Pull Requests and code review
- ✅ Git workflows
- ✅ GitHub collaboration

### Web Technologies
- ✅ HTTP/HTTPS protocols
- ✅ REST API design
- ✅ SSL/TLS certificates
- ✅ Reverse proxy configuration
- ✅ Load balancing concepts

### Nginx
- ✅ Web server configuration
- ✅ Reverse proxy setup
- ✅ SSL/TLS termination
- ✅ Virtual hosts
- ✅ Static file serving
- ✅ Log management

### Docker
- ✅ Dockerfile creation (multi-stage builds)
- ✅ Image optimization (Alpine, npm ci)
- ✅ Container lifecycle management
- ✅ Volumes and bind mounts
- ✅ Environment variables
- ✅ Docker networking
- ✅ Docker Compose orchestration

### CI/CD
- ✅ GitHub Actions workflows
- ✅ Automated testing
- ✅ Docker image building
- ✅ Container registry (GHCR)
- ✅ SSH-based deployment
- ✅ Zero-downtime deployment
- ✅ Secrets management

### Security
- ✅ SSH hardening
- ✅ Firewall configuration
- ✅ SSL/TLS best practices
- ✅ HSTS implementation
- ✅ Container security (non-root)
- ✅ Secrets management

---

## 🚀 Future Improvements

### Short-term (1-2 месяца)
- [ ] Add PostgreSQL database
- [ ] Implement Redis caching
- [ ] Add rate limiting (express-rate-limit)
- [ ] Implement JWT authentication
- [ ] Add API documentation (Swagger/OpenAPI)

### Mid-term (3-6 месяцев)
- [ ] Migrate to Kubernetes (Minikube → Managed K8s)
- [ ] Implement Prometheus + Grafana monitoring
- [ ] Add centralized logging (ELK Stack or Loki)
- [ ] Implement blue-green deployment
- [ ] Add load testing (k6, Artillery)
- [ ] Multi-region deployment

### Long-term (6-12 месяцев)
- [ ] Microservices architecture
- [ ] Service mesh (Istio/Linkerd)
- [ ] GitOps with ArgoCD
- [ ] Infrastructure as Code (Terraform)
- [ ] Configuration management (Ansible)
- [ ] Chaos engineering experiments

---

## 🤝 Contributing

Это учебный проект, но предложения приветствуются!

1. Fork репозиторий
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

## 👤 Author

**Tohnoky**

- GitHub: [@Tohnoky](https://github.com/Tohnoky)
- Project: [devops-learning-project](https://github.com/Tohnoky/devops-learning-project)
- Live Demo: [https://testdevopsproject.duckdns.org](https://testdevopsproject.duckdns.org)

---

## 🙏 Acknowledgments

- [Let's Encrypt](https://letsencrypt.org/) - бесплатные SSL сертификаты
- [DuckDNS](https://www.duckdns.org/) - бесплатный динамический DNS
- [GitHub Actions](https://github.com/features/actions) - CI/CD платформа
- [Express.js](https://expressjs.com/) - веб-фреймворк
- [Docker](https://www.docker.com/) - контейнеризация

---

## 📚 Полезные ресурсы

### Документация
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

### Курсы и туториалы
- [TechWorld with Nana (YouTube)](https://www.youtube.com/c/TechWorldwithNana)
- [DevOps Toolkit (YouTube)](https://www.youtube.com/c/DevOpsToolkit)
- [KodeKloud](https://kodekloud.com/) - интерактивные лаборатории

### Книги
- "The Phoenix Project" - Gene Kim
- "Site Reliability Engineering" - Google
- "Kubernetes in Action" - Marko Luksa

---

⭐️ **Если проект был полезен, поставь звёздочку!** ⭐️
