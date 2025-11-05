import express from 'express';
import {
  getExams,
  getExamById,
  createExam,
  startExam,
  submitExam,
  getExamResults
} from '../controllers/exam.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getExams);
router.get('/:examId', authenticate, getExamById);
router.post('/', authenticate, authorize('admin', 'instructor'), createExam);
router.post('/:examId/start', authenticate, startExam);
router.post('/:examId/submit', authenticate, submitExam);
router.get('/:examId/results/:userId', authenticate, getExamResults);

export default router;

