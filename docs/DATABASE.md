# Database Schema & Firestore Collections

## 📊 Koleksiyonlar

### users
Kullanıcı profil bilgileri

```typescript
interface User {
  id: string;                    // Document ID = Firebase Auth UID
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  phone?: string;
  country?: string;
  examsTaken: number;
  certificatesEarned: number;
  createdAt: string;             // ISO 8601
  updatedAt?: string;
}
```

**Indexes:**
- `email` (ascending)
- `role` (ascending)
- `createdAt` (descending)

**Security Rules:**
- Read: Authenticated users
- Write: User kendi profilini, Admin herkesi

---

### exams
Sınav tanımları

```typescript
interface Exam {
  id: string;
  title: string;
  description: string;
  type: 'esol' | 'speaking' | 'proficiency' | 'placement';
  level: 'Pre-A1' | 'A1' | 'A1+' | 'A2' | 'A2+' | 'B1' | 'B1+' | 'B2' | 'B2+' | 'C1' | 'C1+' | 'C2';
  duration: number;              // Minutes
  totalQuestions: number;
  passingScore: number;          // Percentage (0-100)
  questions: Question[];
  isActive: boolean;
  createdBy: string;             // User ID
  createdAt: string;
  updatedAt?: string;
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
  question: string;
  options?: string[];            // For multiple choice
  correctAnswer: string;
  points: number;
  section?: 'reading' | 'listening' | 'grammar' | 'vocabulary';
}
```

**Indexes:**
- `isActive, level` (composite)
- `type, level` (composite)
- `createdAt` (descending)

**Security Rules:**
- Read: Authenticated users
- Write: Admin, Instructor

---

### examSessions
Sınav oturumları (in-progress)

```typescript
interface ExamSession {
  id: string;
  userId: string;
  examId: string;
  startTime: string;
  endTime: string;
  status: 'in_progress' | 'completed' | 'abandoned' | 'expired';
  answers: Record<string, string>;  // questionId: answer
  currentQuestionIndex?: number;
  createdAt: string;
  completedAt?: string;
}
```

**Indexes:**
- `userId, status` (composite)
- `examId, status` (composite)
- `startTime` (descending)

**Security Rules:**
- Read/Write: User kendi session'ları

---

### examResults
Tamamlanmış sınav sonuçları

```typescript
interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  sessionId: string;
  score: number;                 // Percentage
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  answers: Record<string, string>;
  detailedResults?: {
    reading?: number;
    listening?: number;
    grammar?: number;
    vocabulary?: number;
  };
  completedAt: string;
}
```

**Indexes:**
- `userId, completedAt` (composite, descending)
- `examId, userId` (composite)
- `passed, score` (composite, descending)

**Security Rules:**
- Read: User kendi sonuçları, Admin tümü
- Write: Backend only (via Admin SDK)

---

### certificates
Başarı sertifikaları

```typescript
interface Certificate {
  id: string;
  certificateNumber: string;     // Unique: CERT-timestamp-uid
  userId: string;
  examId: string;
  resultId: string;
  examTitle: string;
  level: string;
  score: number;
  userName: string;
  issuedAt: string;
  validUntil: string;            // +1 year
  status: 'active' | 'expired' | 'revoked';
}
```

**Indexes:**
- `certificateNumber` (ascending, unique)
- `userId, issuedAt` (composite, descending)
- `validUntil, status` (composite)

**Security Rules:**
- Read: Public (by certificateNumber)
- Write: Backend only

---

### feedbacks (TODO)
Kullanıcı geri bildirimleri

```typescript
interface Feedback {
  id: string;
  userId: string;
  examId?: string;
  rating: number;                // 1-5
  comment: string;
  category: 'bug' | 'feature' | 'general';
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}
```

---

## 🔒 Security Rules Özeti

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.role == 'admin';
    }
    
    function isInstructor() {
      return isAuthenticated() && 
             (request.auth.token.role == 'instructor' || 
              request.auth.token.role == 'admin');
    }
  }
}
```

## 📈 Veri Akışı

### Sınav Alma Akışı
1. User `/exams` listeler → `exams` koleksiyonu
2. User sınav seçer → `POST /exams/:id/start`
3. Backend `examSessions` oluşturur
4. User soruları cevaplar → answers `examSessions`'da güncellenir
5. User submit eder → `POST /exams/:id/submit`
6. Backend skorlar → `examResults` oluşturur
7. User sonucu görür → `examResults` okunur
8. User sertifika ister → `certificates` oluşturur

## 🔄 Backup Strategy (TODO)

### Otomatik Backup
- Günlük: Firestore export
- Haftalık: Full backup
- Retention: 30 gün

### Restore
```bash
gcloud firestore import gs://[BUCKET]/[EXPORT_PREFIX]
```

## 📊 Data Analytics (TODO)

### BigQuery Export
- Real-time streaming
- Analytics queries
- Reporting dashboards

## 🧹 Data Cleanup (TODO)

### Retention Policies
- Abandoned sessions: 7 gün sonra sil
- Expired certificates: 2 yıl sonra archive
- Old exam results: 5 yıl sonra anonymize

