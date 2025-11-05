# Deployment Guide

## 🚀 Deployment Ortamları

### 1. Staging Environment
- **URL**: https://staging.exam-platform.com
- **Firebase Project**: exam-platform-staging
- **Server**: Ubuntu 22.04 LTS
- **Branch**: `staging`
- **Auto-deploy**: ✅ (on push to staging)

### 2. Production Environment
- **URL**: https://exam-platform.com
- **Firebase Project**: exam-platform-prod
- **Server**: Ubuntu 22.04 LTS
- **Branch**: `main`
- **Auto-deploy**: ❌ (manual approval required)

## 📦 Ön Hazırlık

### 1. Firebase Projesi Oluşturma

```bash
# Firebase CLI yükleme
npm install -g firebase-tools

# Firebase'e login
firebase login

# Proje oluşturma
firebase projects:create exam-platform-staging
firebase projects:create exam-platform-prod
```

### 2. GitHub Secrets Yapılandırma

Repository Settings > Secrets and variables > Actions:

**Staging:**
- `STAGING_SSH_KEY`: SSH private key
- `STAGING_HOST`: Server IP/domain
- `STAGING_USER`: SSH username

**Production:**
- `PROD_SSH_KEY`: SSH private key
- `PROD_HOST`: Server IP/domain
- `PROD_USER`: SSH username
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON

### 3. Server Hazırlığı

```bash
# Server'a bağlan
ssh user@server-ip

# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose kurulumu
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Proje dizini oluştur
sudo mkdir -p /opt/exam-platform
sudo chown -R $USER:$USER /opt/exam-platform

# Repository clone
cd /opt/exam-platform
git clone https://github.com/your-org/exam-platform.git .
```

## 🔄 Deployment Süreci

### Staging Deployment

1. Feature branch'inizi `staging`'e merge edin:
```bash
git checkout staging
git merge feature/your-feature
git push origin staging
```

2. GitHub Actions otomatik olarak:
   - Testleri çalıştırır
   - Lint kontrolü yapar
   - Docker image'ları build eder
   - Server'a deploy eder

### Production Deployment

1. `staging`'i `main`'e merge edin:
```bash
git checkout main
git merge staging
git push origin main
```

2. GitHub Actions:
   - Testleri çalıştırır
   - Lint kontrolü yapar
   - Docker image'ları build eder
   - **Manuel onay bekler**
   - Onaydan sonra production'a deploy eder

## 🐳 Manuel Docker Deployment

### Build & Run

```bash
# Production build
docker-compose build

# Containers'ı başlat
docker-compose up -d

# Logları kontrol et
docker-compose logs -f

# Status kontrolü
docker-compose ps
```

### Update & Restart

```bash
# En son kodu çek
git pull origin main

# Rebuild ve restart
docker-compose up -d --build

# Eski image'ları temizle
docker system prune -a
```

## 🔒 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
FIREBASE_PROJECT_ID=exam-platform-prod
CORS_ORIGIN=https://exam-platform.com
```

### Web (.env)
```env
API_URL=https://api.exam-platform.com/api/v1
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=exam-platform-prod.firebaseapp.com
FIREBASE_PROJECT_ID=exam-platform-prod
FIREBASE_STORAGE_BUCKET=exam-platform-prod.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 🔍 Health Checks

### Backend
```bash
curl http://localhost:5000/health
```

### Web
```bash
curl http://localhost:3000/
```

## 📊 Monitoring

### Logs

```bash
# Backend logs
docker-compose logs -f backend

# Web logs
docker-compose logs -f web

# Son 100 satır
docker-compose logs --tail=100 backend
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## 🔄 Rollback

```bash
# Önceki commit'e dön
git revert HEAD
git push origin main

# Veya önceki image'a dön
docker-compose down
docker-compose up -d --no-deps --build backend
```

## 🛡 Security Checklist

- [ ] Firewall yapılandırıldı (UFW)
- [ ] HTTPS sertifikaları yüklendi (Let's Encrypt)
- [ ] SSH key-based authentication
- [ ] Fail2ban kuruldu
- [ ] Automated backups yapılandırıldı
- [ ] Firebase security rules güncel
- [ ] Environment variables güvenli
- [ ] Rate limiting aktif (TODO)

## 🔐 SSL/HTTPS Setup (Nginx)

```bash
# Nginx kurulumu
sudo apt install nginx certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d exam-platform.com -d www.exam-platform.com

# Auto-renewal test
sudo certbot renew --dry-run
```

## 📱 Mobile App Deployment

### iOS (App Store)

```bash
cd mobile
eas build --platform ios
eas submit --platform ios
```

### Android (Google Play)

```bash
cd mobile
eas build --platform android
eas submit --platform android
```

## 🆘 Troubleshooting

### Container çalışmıyor
```bash
docker-compose logs backend
docker-compose restart backend
```

### Port conflict
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Disk dolu
```bash
docker system prune -a --volumes
```

### Firebase connection error
- Service account JSON doğru mu?
- Firebase project ID doğru mu?
- Network/firewall kuralları kontrol edin

## 📞 Support

- DevOps: devops@exam-platform.com
- Emergency: +1-XXX-XXX-XXXX

