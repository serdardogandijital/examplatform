import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebase';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import examRoutes from './routes/exam.routes';
import userRoutes from './routes/user.routes';
import certificateRoutes from './routes/certificate.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
initializeFirebase();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Exam Platform API is running' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/certificates', certificateRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

export default app;

