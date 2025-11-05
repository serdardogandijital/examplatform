# Sistem Mimarisi

## 🏗 Genel Yapı

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
├─────────────────┬───────────────────┬───────────────────┤
│   Web (Next.js) │  Mobile (Expo RN) │   Admin Panel     │
└────────┬────────┴──────────┬────────┴─────────┬─────────┘
         │                   │                  │
         └───────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │  (Express.js)   │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐         ┌────▼────┐       ┌─────▼─────┐
    │Firebase │         │Firebase │       │  Firebase │
    │  Auth   │         │Firestore│       │  Storage  │
    └─────────┘         └─────────┘       └───────────┘
```

## 📦 Backend Architecture

### Katmanlar
1. **Routes Layer**: API endpoint tanımları
2. **Controller Layer**: Request/response handling
3. **Service Layer**: Business logic (TODO)
4. **Data Layer**: Firebase Admin SDK

### API Response Format
```typescript
{
  success: boolean,
  data?: any,
  error?: string
}
```

## 🎨 Frontend Architecture

### Next.js App Router
- Server-side rendering (SSR)
- Static generation (SSG)
- API routes
- Middleware

### State Management
- **Zustand**: Global state (auth, exam)
- **React Hook Form**: Form state
- **React Context**: Theme, locale

### Styling
- Tailwind CSS utility-first
- CSS Modules için desteklendi
- Responsive design (mobile-first)

## 📱 Mobile Architecture

### Expo Router
- File-based routing
- Native navigation
- Deep linking support

### State Management
- Zustand (web ile paylaşılan store)
- AsyncStorage (local persistence)

## 🔐 Authentication Flow

```
1. User registers → Backend creates Firebase Auth user
2. Backend sets custom claims (role)
3. Frontend receives ID token
4. All API requests include Bearer token
5. Backend middleware verifies token
```

## 🗄 Database Schema

### Collections

#### users
```typescript
{
  email: string
  firstName: string
  lastName: string
  role: 'student' | 'instructor' | 'admin'
  examsTaken: number
  certificatesEarned: number
  createdAt: string
}
```

#### exams
```typescript
{
  title: string
  description: string
  type: 'esol' | 'speaking' | 'proficiency' | 'placement'
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  duration: number (minutes)
  totalQuestions: number
  passingScore: number
  questions: Question[]
  isActive: boolean
  createdBy: string (userId)
  createdAt: string
}
```

#### examSessions
```typescript
{
  userId: string
  examId: string
  startTime: string
  endTime: string
  status: 'in_progress' | 'completed' | 'abandoned'
  answers: Record<string, string>
}
```

#### examResults
```typescript
{
  userId: string
  examId: string
  sessionId: string
  score: number
  correctAnswers: number
  totalQuestions: number
  passed: boolean
  completedAt: string
}
```

#### certificates
```typescript
{
  userId: string
  examId: string
  resultId: string
  certificateNumber: string
  examTitle: string
  level: string
  score: number
  userName: string
  issuedAt: string
  validUntil: string
}
```

## 🔄 CI/CD Pipeline

### Branches
- `main`: Production
- `staging`: Staging environment
- `feature/*`: Feature development
- `hotfix/*`: Emergency fixes

### Pipeline Steps
1. **Lint**: ESLint + Prettier
2. **Test**: Jest unit tests
3. **Build**: TypeScript compilation + Next.js build
4. **Deploy**: Docker container deployment

## 📊 Monitoring (TODO)

- Application logs (Winston)
- Error tracking (Sentry)
- Performance monitoring (Firebase Performance)
- Analytics (Google Analytics)

## 🔒 Security

- Firebase Authentication
- Role-based access control (RBAC)
- Firestore security rules
- HTTPS only
- Helmet.js security headers
- Rate limiting (TODO)

## 🚀 Deployment

### Staging
- Auto-deploy on `staging` push
- Ubuntu server + Docker
- Staging Firebase project

### Production
- Manual approval required
- Ubuntu server + Docker
- Production Firebase project
- Zero-downtime deployment

