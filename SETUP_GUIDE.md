# 🎯 TAM KURULUM REHBERİ

## ✅ Tamamlanan İşlemler

### 1. GitHub Repository
- ✅ Repository: https://github.com/serdardogandijital/examplatform
- ✅ Main branch push edildi
- ✅ Staging branch oluşturuldu
- ✅ Tüm kod GitHub'a yüklendi

### 2. Proje Yapısı
- ✅ Backend (Express.js + TypeScript + Firebase)
- ✅ Web (Next.js 14 + Tailwind CSS)
- ✅ Mobile (Expo React Native)
- ✅ Docker + CI/CD yapılandırması
- ✅ Tüm bağımlılıklar yüklendi (2154 paket)

### 3. Geliştirme Araçları
- ✅ Git hooks (Husky) kuruldu
- ✅ ESLint + Prettier yapılandırıldı
- ✅ Commitizen hazır
- ✅ Environment dosyaları oluşturuldu

---

## 🔥 Firebase Projesi Kurulumu

### Adım 1: Firebase CLI Kurulumu
```bash
npm install -g firebase-tools
firebase login
```

### Adım 2: Firebase Projeleri Oluşturma

#### Development Projesi
```bash
firebase projects:create examplatform-dev --display-name "Exam Platform Dev"
```

#### Staging Projesi
```bash
firebase projects:create examplatform-staging --display-name "Exam Platform Staging"
```

#### Production Projesi
```bash
firebase projects:create examplatform-prod --display-name "Exam Platform Production"
```

### Adım 3: Firebase Projelerini Aktifleştirme

Her proje için:
1. Firebase Console'a git: https://console.firebase.google.com
2. Projeyi seç
3. **Authentication** → Email/Password aktif et
4. **Firestore Database** → Oluştur (test mode)
5. **Storage** → Başlat

### Adım 4: Web App Oluşturma

Her projede:
1. Project Settings → Add app → Web
2. App nickname: "Exam Platform Web"
3. Firebase SDK configuration'ı kopyala

### Adım 5: Environment Dosyalarını Güncelle

#### Backend (.env)
```bash
cd /Users/serdardogan/tst
nano backend/.env
```

Düzenle:
```env
NODE_ENV=development
PORT=5000
FIREBASE_PROJECT_ID=examplatform-dev
FIREBASE_EMULATOR_AUTH_HOST=localhost:9099
FIREBASE_EMULATOR_FIRESTORE_HOST=localhost:8080
FIREBASE_EMULATOR_STORAGE_HOST=localhost:9199
CORS_ORIGIN=http://localhost:3000
```

#### Web (.env)
```bash
nano web/.env
```

Düzenle (Firebase Console'dan aldığın değerlerle):
```env
API_URL=http://localhost:5000/api/v1
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=examplatform-dev.firebaseapp.com
FIREBASE_PROJECT_ID=examplatform-dev
FIREBASE_STORAGE_BUCKET=examplatform-dev.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 🚀 Sistemi Başlatma

### Terminal 1: Firebase Emulator
```bash
cd /Users/serdardogan/tst
npm run emulator
```

Firebase UI: http://localhost:4000

### Terminal 2: Backend + Web
```bash
cd /Users/serdardogan/tst
npm run dev
```

- Backend API: http://localhost:5000
- Web App: http://localhost:3000

### Terminal 3: Mobile (İsteğe Bağlı)
```bash
cd /Users/serdardogan/tst
npm run dev:mobile
```

---

## 🧪 Test ve Doğrulama

### 1. Backend Health Check
```bash
curl http://localhost:5000/health
```

Beklenen sonuç:
```json
{
  "success": true,
  "message": "Exam Platform API is running"
}
```

### 2. Web App
Tarayıcıda aç: http://localhost:3000

### 3. Firebase Emulator UI
Tarayıcıda aç: http://localhost:4000

---

## 📋 Günlük Geliştirme Akışı

### Sabah Başlarken
```bash
cd /Users/serdardogan/tst
git pull origin main
npm install  # Yeni bağımlılık varsa
```

### Feature Geliştirme
```bash
# Yeni feature branch oluştur
git checkout -b feature/exam-listing

# Kod yaz...

# Test et
npm test
npm run lint

# Commit (Commitizen ile)
git add .
git cz

# Push
git push origin feature/exam-listing
```

### Pull Request
1. GitHub'da PR aç: https://github.com/serdardogandijital/examplatform/pulls
2. Staging branch'e merge et
3. Review sonrası main'e merge

---

## 🐳 Docker ile Çalıştırma (Alternatif)

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production Build Test
```bash
docker-compose build
docker-compose up -d
```

Durdurma:
```bash
docker-compose down
```

---

## 🔧 Sık Kullanılan Komutlar

```bash
# Tüm testleri çalıştır
npm test

# Lint kontrolü
npm run lint

# Build (production)
npm run build

# Backend bağımsız çalıştır
npm run dev:backend

# Web bağımsız çalıştır
npm run dev:web

# Mobile çalıştır
npm run dev:mobile

# Firebase Emulator
npm run emulator

# Git commit (Commitizen)
git cz

# Bağımlılık güncelle
npm update
```

---

## 🔐 GitHub Secrets (Production Deployment İçin)

Repository Settings → Secrets and variables → Actions:

### Staging Secrets
```
STAGING_SSH_KEY=<your_ssh_private_key>
STAGING_HOST=<server_ip>
STAGING_USER=<ssh_username>
```

### Production Secrets
```
PROD_SSH_KEY=<your_ssh_private_key>
PROD_HOST=<server_ip>
PROD_USER=<ssh_username>
FIREBASE_SERVICE_ACCOUNT=<firebase_service_account_json>
```

---

## 📚 Dokümantasyon Linkleri

- **Ana README**: [README.md](./README.md)
- **Hızlı Başlangıç**: [QUICKSTART.md](./QUICKSTART.md)
- **API Dokümantasyonu**: [docs/API.md](./docs/API.md)
- **Mimari**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Veritabanı**: [docs/DATABASE.md](./docs/DATABASE.md)
- **Deployment**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
- **Katkı Rehberi**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🆘 Sorun Giderme

### Port zaten kullanımda
```bash
# 5000 portunu kim kullanıyor?
lsof -i :5000
kill -9 <PID>

# 3000 portunu kim kullanıyor?
lsof -i :3000
kill -9 <PID>
```

### Node modules sorunu
```bash
rm -rf node_modules package-lock.json
npm install
```

### Git hook çalışmıyor
```bash
npm run prepare
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Firebase connection hatası
1. `.env` dosyalarını kontrol et
2. Firebase Emulator çalışıyor mu? (Terminal 1)
3. Firebase project ID doğru mu?

---

## 📞 Yardım ve Destek

- **GitHub Issues**: https://github.com/serdardogandijital/examplatform/issues
- **Dokümantasyon**: Bu klasördeki tüm MD dosyaları
- **Firebase Console**: https://console.firebase.google.com

---

## ✨ Tamamlandı!

Sistem hazır, geliştirmeye başlayabilirsiniz! 🚀

**Sonraki adımlar:**
1. Firebase projelerini oluştur (yukarıdaki adımlar)
2. Environment dosyalarını düzenle
3. `npm run emulator` ve `npm run dev` ile başlat
4. http://localhost:3000 adresini aç
5. Kod yazmaya başla! 🎉

