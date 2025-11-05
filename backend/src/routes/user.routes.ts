import express from 'express';
import { getProfile, updateProfile, getUserExams } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/exams', authenticate, getUserExams);

export default router;

