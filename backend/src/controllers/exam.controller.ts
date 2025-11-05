import { Response } from 'express';
import { db } from '../config/firebase';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getExams = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { level, type } = req.query;

  let query = db.collection('exams').where('isActive', '==', true);

  if (level) query = query.where('level', '==', level);
  if (type) query = query.where('type', '==', type);

  const snapshot = await query.get();
  const exams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    success: true,
    data: exams
  });
});

export const getExamById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { examId } = req.params;

  const examDoc = await db.collection('exams').doc(examId).get();

  if (!examDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'Exam not found'
    });
  }

  res.status(200).json({
    success: true,
    data: { id: examDoc.id, ...examDoc.data() }
  });
});

export const createExam = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    title,
    description,
    type,
    level,
    duration,
    totalQuestions,
    passingScore,
    questions
  } = req.body;

  const examData = {
    title,
    description,
    type,
    level,
    duration,
    totalQuestions,
    passingScore,
    questions,
    isActive: true,
    createdBy: req.user?.uid,
    createdAt: new Date().toISOString()
  };

  const examRef = await db.collection('exams').add(examData);

  res.status(201).json({
    success: true,
    data: { id: examRef.id, ...examData }
  });
});

export const startExam = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { examId } = req.params;
  const userId = req.user?.uid;

  const examDoc = await db.collection('exams').doc(examId).get();

  if (!examDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'Exam not found'
    });
  }

  const examData = examDoc.data();
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + (examData?.duration || 60) * 60000);

  const sessionData = {
    userId,
    examId,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    status: 'in_progress',
    answers: {}
  };

  const sessionRef = await db.collection('examSessions').add(sessionData);

  res.status(200).json({
    success: true,
    data: {
      sessionId: sessionRef.id,
      exam: { id: examDoc.id, ...examData },
      startTime: sessionData.startTime,
      endTime: sessionData.endTime
    }
  });
});

export const submitExam = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { examId } = req.params;
  const { sessionId, answers } = req.body;
  const userId = req.user?.uid;

  const sessionDoc = await db.collection('examSessions').doc(sessionId).get();

  if (!sessionDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'Exam session not found'
    });
  }

  const examDoc = await db.collection('exams').doc(examId).get();
  const examData = examDoc.data();

  // Calculate score
  let correctAnswers = 0;
  const questions = examData?.questions || [];

  Object.keys(answers).forEach(questionId => {
    const question = questions.find((q: { id: string; correctAnswer: string }) => q.id === questionId);
    if (question && question.correctAnswer === answers[questionId]) {
      correctAnswers++;
    }
  });

  const score = (correctAnswers / questions.length) * 100;
  const passed = score >= (examData?.passingScore || 70);

  const resultData = {
    userId,
    examId,
    sessionId,
    answers,
    score,
    correctAnswers,
    totalQuestions: questions.length,
    passed,
    completedAt: new Date().toISOString()
  };

  const resultRef = await db.collection('examResults').add(resultData);

  await db.collection('examSessions').doc(sessionId).update({
    status: 'completed',
    completedAt: new Date().toISOString()
  });

  // Update user stats
  await db.collection('users').doc(userId!).update({
    examsTaken: (await db.collection('users').doc(userId!).get()).data()?.examsTaken + 1 || 1
  });

  res.status(200).json({
    success: true,
    data: {
      resultId: resultRef.id,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      passed
    }
  });
});

export const getExamResults = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { examId, userId } = req.params;

  if (req.user?.uid !== userId && req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden'
    });
  }

  const snapshot = await db
    .collection('examResults')
    .where('examId', '==', examId)
    .where('userId', '==', userId)
    .get();

  const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    success: true,
    data: results
  });
});

