# Exam Platform - Online Sınav Sistemi

PQS Global benzeri profesyonel online dil sınav platformu. CEFR standartlarına uygun, anlık değerlendirme ve sertifika sistemi ile eksiksiz bir sınav çözümü.

## 🎯 Özellikler

- **Çoklu Sınav Tipleri**: ESOL, Speaking, Proficiency, Placement testleri
- **CEFR Uyumlu**: A1'den C2'ye tüm seviyeler
- **Anlık Sonuç**: Sınav sonrası otomatik değerlendirme ve detaylı feedback
- **Sertifika Sistemi**: Uluslararası geçerliliği olan başarı sertifikaları
- **Responsive Design**: Web ve mobil uyumlu modern arayüz
- **Role-Based Access**: Öğrenci, öğretmen ve admin rolleri

## 🛠 Teknoloji Stack

### Backend
- Node.js + Express.js + TypeScript
- Firebase Admin SDK (Auth, Firestore, Storage)
- JWT Authentication & Authorization
- RESTful API Architecture

### Frontend (Web)
- Next.js 14 (React 18 + TypeScript)
- Tailwind CSS
- Firebase Client SDK
- Zustand (State Management)
- React Hook Form + Zod

### Mobile
- Expo React Native
- TypeScript
- Firebase SDK

### Infrastructure
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Firebase Emulator Suite (Local Development)
- Husky + Commitizen + ESLint + Prettier

## 📁 Proje Yapısı

```
exam-platform/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, error handling
│   │   ├── services/     # Business logic
│   │   └── config/       # Firebase, env config
│   └── package.json
├── web/                  # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utils, API client, store
│   └── package.json
├── mobile/               # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   └── navigation/
│   └── package.json
├── infra/
│   ├── docker/           # Dockerfile'lar
│   └── firebase/         # Firebase config
├── .github/
│   └── workflows/        # CI/CD pipelines
└── package.json          # Root workspace
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 20+
- npm 10+
- Docker & Docker Compose
- Firebase CLI
- Git

### 1. Repository'yi klonlayın
```bash
git clone https://github.com/your-org/exam-platform.git
cd exam-platform
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
```

### 3. Environment dosyalarını yapılandırın
```bash
# Backend
cp backend/.env.example backend/.env

# Web
cp web/.env.example web/.env
```

### 4. Firebase Emulator'ı başlatın
```bash
npm run emulator
```

### 5. Geliştirme sunucularını başlatın
```bash
# Tüm servisleri başlat
npm run dev

# Veya ayrı ayrı:
npm run dev:backend  # Backend: http://localhost:5000
npm run dev:web      # Web: http://localhost:3000
npm run dev:mobile   # Mobile: Expo başlatır
```

## 🧪 Test

```bash
# Tüm testleri çalıştır
npm test

# Lint kontrolü
npm run lint

# Build
npm run build
```

## 🐳 Docker ile Çalıştırma

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose up -d
```

## 📦 Deployment

### Staging
```bash
git push origin staging
# GitHub Actions otomatik deploy eder
```

### Production
```bash
git push origin main
# PR onayından sonra GitHub Actions deploy eder
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/login` - Giriş
- `POST /api/v1/auth/logout` - Çıkış

### Exams
- `GET /api/v1/exams` - Sınavları listele
- `GET /api/v1/exams/:id` - Sınav detayı
- `POST /api/v1/exams` - Yeni sınav oluştur (Admin/Instructor)
- `POST /api/v1/exams/:id/start` - Sınav başlat
- `POST /api/v1/exams/:id/submit` - Sınav tamamla

### Users
- `GET /api/v1/users/profile` - Profil bilgisi
- `PUT /api/v1/users/profile` - Profil güncelle
- `GET /api/v1/users/exams` - Kullanıcının sınavları

### Certificates
- `POST /api/v1/certificates/generate` - Sertifika oluştur
- `GET /api/v1/certificates/:id` - Sertifika görüntüle

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
CORS_ORIGIN=http://localhost:3000
```

### Web (.env.local)
```env
API_URL=http://localhost:5000/api/v1
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
```

## 🤝 Geliştirme Akışı

1. **Feature Branch Oluştur**: `git checkout -b feature/yeni-ozellik`
2. **Değişiklikleri Yap**: Kod yaz, test et
3. **Commit**: `git cz` (Commitizen ile)
4. **Push**: `git push origin feature/yeni-ozellik`
5. **Pull Request Oluştur**: GitHub'da PR aç
6. **Review**: En az 1 review al
7. **Merge**: Staging'e merge et

## 📝 Commit Mesajı Formatı

```
feat: yeni özellik ekleme
fix: hata düzeltme
docs: dokümantasyon
style: kod formatı
refactor: kod iyileştirme
test: test ekleme
chore: konfigürasyon
```

## 🎨 Kod Standartları

- TypeScript strict mode
- ESLint + Prettier
- RESTful API convention
- Error handling middleware
- API response format: `{ success: boolean, data?: any, error?: string }`

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakın.

## 👥 Takım

- Developer 1: Backend & Infrastructure
- Developer 2: Frontend & Mobile

## 📞 İletişim

- Email: info@exam-platform.com
- GitHub: https://github.com/serdardogandijital/examplatform

