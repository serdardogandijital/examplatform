# 🎮 Hızlı Komutlar Kılavuzu

## 🚀 Başlatma Komutları

### Tek Komutla Başlat (Önerilen)
```bash
./START.sh
```
Firebase Emulator + Backend + Web'i otomatik başlatır.

### Manuel Başlatma

**Terminal 1 - Firebase Emulator:**
```bash
npm run emulator
```

**Terminal 2 - Backend + Web:**
```bash
npm run dev
```

**Terminal 3 - Sadece Backend:**
```bash
npm run dev:backend
```

**Terminal 4 - Sadece Web:**
```bash
npm run dev:web
```

**Terminal 5 - Mobile:**
```bash
npm run dev:mobile
```

---

## 🛑 Durdurma Komutları

### Tek Komutla Durdur
```bash
./STOP.sh
```

### Manuel Port Temizleme
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Web (3000)
lsof -ti:3000 | xargs kill -9

# Firebase UI (4000)
lsof -ti:4000 | xargs kill -9

# Firestore (8080)
lsof -ti:8080 | xargs kill -9
```

---

## 🧪 Test Komutları

```bash
# Tüm testler
npm test

# Backend testleri
npm test --workspace=backend

# Web testleri
npm test --workspace=web

# Test coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🔍 Lint ve Format

```bash
# Lint kontrolü (tüm workspace)
npm run lint

# Backend lint
npm run lint --workspace=backend

# Web lint
npm run lint --workspace=web

# Auto-fix
npm run lint -- --fix
```

---

## 📦 Build Komutları

```bash
# Tüm projeyi build et
npm run build

# Sadece backend
npm run build --workspace=backend

# Sadece web
npm run build --workspace=web

# Production build sonrası çalıştır
cd backend && npm start
cd web && npm start
```

---

## 🐳 Docker Komutları

### Development
```bash
# Başlat
docker-compose -f docker-compose.dev.yml up

# Arkaplanda başlat
docker-compose -f docker-compose.dev.yml up -d

# Durdur
docker-compose -f docker-compose.dev.yml down

# Logları görüntüle
docker-compose -f docker-compose.dev.yml logs -f
```

### Production
```bash
# Build ve başlat
docker-compose up -d --build

# Durdur
docker-compose down

# Status
docker-compose ps

# Loglar
docker-compose logs -f backend
docker-compose logs -f web
```

---

## 🔥 Firebase Komutları

```bash
# Login
firebase login

# Proje listesi
firebase projects:list

# Emulator başlat
firebase emulators:start

# Firestore data export
firebase firestore:export gs://bucket/path

# Firestore data import
firebase firestore:import gs://bucket/path

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

---

## 📊 Git Komutları

### Feature Development
```bash
# Yeni feature branch
git checkout -b feature/exam-timer

# Stage değişiklikler
git add .

# Commit (Commitizen ile)
git cz

# Push
git push origin feature/exam-timer
```

### Branch Management
```bash
# Branch listesi
git branch -a

# Branch değiştir
git checkout staging

# Merge feature to staging
git checkout staging
git merge feature/exam-timer
git push origin staging

# Main'e merge (production)
git checkout main
git merge staging
git push origin main
```

### Sync
```bash
# Son değişiklikleri çek
git pull origin main

# Rebase
git pull --rebase origin main

# Stash (değişiklikleri sakla)
git stash
git pull
git stash pop
```

---

## 📝 Log Komutları

```bash
# Backend logs (development)
npm run dev:backend

# Docker container logs
docker logs -f examplatform-backend
docker logs -f examplatform-web

# Son 100 satır
docker logs --tail=100 examplatform-backend

# Real-time follow
docker logs -f --tail=50 examplatform-backend
```

---

## 🔄 Database Komutları

### Firestore (via Firebase Console)
```bash
# Emulator UI açık olmalı
open http://localhost:4000/firestore
```

### Firebase CLI ile
```bash
# Collection export
firebase firestore:export backup-$(date +%Y%m%d)

# Delete collection (DANGER!)
# Firebase Console üzerinden yapılmalı
```

---

## 🧹 Temizlik Komutları

```bash
# node_modules temizle (tüm workspace)
rm -rf node_modules backend/node_modules web/node_modules mobile/node_modules
npm install

# Build outputs temizle
rm -rf backend/dist web/.next mobile/.expo

# Docker temizliği
docker system prune -a

# Git temizliği
git clean -fdx
```

---

## 📱 Mobile (Expo) Komutları

```bash
# Başlat
npm run dev:mobile

# Android
cd mobile && npm run android

# iOS
cd mobile && npm run ios

# Web
cd mobile && npm run web

# Clear cache
cd mobile && expo start -c
```

---

## 🔐 Security Audit

```bash
# npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (dikkatli!)
npm audit fix --force

# Dependency check
npm outdated
```

---

## 📈 Performance Komutları

```bash
# Bundle size analizi (web)
cd web && npm run build
# Next.js otomatik bundle analizi gösterir

# Backend memory usage
node --inspect backend/dist/index.js
```

---

## 🎯 Hızlı Erişim URLs

```bash
# Web App
open http://localhost:3000

# Backend API
open http://localhost:5000/health

# Firebase Emulator UI
open http://localhost:4000

# API Docs (TODO: Swagger)
# open http://localhost:5000/api-docs
```

---

## 💡 Yararlı Aliaslar (.zshrc veya .bashrc)

```bash
# Ekle: ~/.zshrc veya ~/.bashrc
alias exam-start="cd /Users/serdardogan/tst && ./START.sh"
alias exam-stop="cd /Users/serdardogan/tst && ./STOP.sh"
alias exam-test="cd /Users/serdardogan/tst && npm test"
alias exam-lint="cd /Users/serdardogan/tst && npm run lint"
alias exam-build="cd /Users/serdardogan/tst && npm run build"
alias exam-logs="cd /Users/serdardogan/tst && docker-compose logs -f"

# Aktif et
source ~/.zshrc
```

Artık sadece `exam-start` yazarak sistemi başlatabilirsin! 🎉

