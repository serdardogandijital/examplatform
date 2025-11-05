# API Documentation

Base URL: `http://localhost:5000/api/v1` (development)

## Response Format

Tüm API yanıtları aşağıdaki formatta döner:

```typescript
{
  success: boolean
  data?: any
  error?: string
}
```

## Authentication

Korumalı endpoint'ler için Authorization header gereklidir:

```
Authorization: Bearer <firebase_id_token>
```

## Endpoints

### 🔐 Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"
}

Response 201:
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "role": "student"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

Note: Use Firebase Auth SDK on client side
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 📝 Exams

#### List Exams
```http
GET /exams?level=B2&type=esol
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "exam123",
      "title": "ESOL B2 General",
      "level": "B2",
      "type": "esol",
      "duration": 90,
      "totalQuestions": 50,
      "passingScore": 70
    }
  ]
}
```

#### Get Exam by ID
```http
GET /exams/:examId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "id": "exam123",
    "title": "ESOL B2 General",
    "questions": [...]
  }
}
```

#### Create Exam (Admin/Instructor)
```http
POST /exams
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "ESOL B2 General",
  "description": "Comprehensive B2 level exam",
  "type": "esol",
  "level": "B2",
  "duration": 90,
  "totalQuestions": 50,
  "passingScore": 70,
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "What is...?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "B"
    }
  ]
}

Response 201:
{
  "success": true,
  "data": { "id": "exam123", ... }
}
```

#### Start Exam
```http
POST /exams/:examId/start
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "sessionId": "session123",
    "exam": {...},
    "startTime": "2025-11-05T10:00:00Z",
    "endTime": "2025-11-05T11:30:00Z"
  }
}
```

#### Submit Exam
```http
POST /exams/:examId/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionId": "session123",
  "answers": {
    "q1": "B",
    "q2": "A",
    ...
  }
}

Response 200:
{
  "success": true,
  "data": {
    "resultId": "result123",
    "score": 85,
    "correctAnswers": 42,
    "totalQuestions": 50,
    "passed": true
  }
}
```

#### Get Exam Results
```http
GET /exams/:examId/results/:userId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "result123",
      "score": 85,
      "passed": true,
      "completedAt": "2025-11-05T11:30:00Z"
    }
  ]
}
```

### 👤 Users

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "examsTaken": 5,
    "certificatesEarned": 3
  }
}
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890",
  "country": "USA"
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

#### Get User Exams
```http
GET /users/exams
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [...]
}
```

### 🎓 Certificates

#### Generate Certificate
```http
POST /certificates/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "resultId": "result123"
}

Response 201:
{
  "success": true,
  "data": {
    "id": "cert123",
    "certificateNumber": "CERT-1730000000-user123",
    "examTitle": "ESOL B2 General",
    "score": 85,
    "issuedAt": "2025-11-05T12:00:00Z",
    "validUntil": "2026-11-05T12:00:00Z"
  }
}
```

#### Get Certificate
```http
GET /certificates/:certificateId

Response 200:
{
  "success": true,
  "data": {
    "certificateNumber": "CERT-1730000000-user123",
    "userName": "John Doe",
    "examTitle": "ESOL B2 General",
    "level": "B2",
    "score": 85
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Invalid or missing token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error |

## Rate Limiting (TODO)

- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination (TODO)

```http
GET /exams?page=1&limit=20
```

## Filtering & Sorting (TODO)

```http
GET /exams?level=B2&sort=createdAt:desc
```

