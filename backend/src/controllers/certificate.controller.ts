import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const generateCertificate = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { resultId } = req.body;
  const userId = req.user?.uid;

  const resultDoc = await db.collection('examResults').doc(resultId).get();

  if (!resultDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'Exam result not found'
    });
  }

  const resultData = resultDoc.data();

  if (resultData?.userId !== userId) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden'
    });
  }

  if (!resultData?.passed) {
    return res.status(400).json({
      success: false,
      error: 'Certificate can only be generated for passed exams'
    });
  }

  const examDoc = await db.collection('exams').doc(resultData.examId).get();
  const userDoc = await db.collection('users').doc(userId!).get();

  const certificateData = {
    userId,
    examId: resultData.examId,
    resultId,
    certificateNumber: `CERT-${Date.now()}-${userId?.substring(0, 8)}`,
    examTitle: examDoc.data()?.title,
    level: examDoc.data()?.level,
    score: resultData.score,
    userName: `${userDoc.data()?.firstName} ${userDoc.data()?.lastName}`,
    issuedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };

  const certificateRef = await db.collection('certificates').add(certificateData);

  await db.collection('users').doc(userId!).update({
    certificatesEarned: (userDoc.data()?.certificatesEarned || 0) + 1
  });

  res.status(201).json({
    success: true,
    data: { id: certificateRef.id, ...certificateData }
  });
});

export const getCertificate = asyncHandler(async (req: Request, res: Response) => {
  const { certificateId } = req.params;

  const certificateDoc = await db.collection('certificates').doc(certificateId).get();

  if (!certificateDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'Certificate not found'
    });
  }

  res.status(200).json({
    success: true,
    data: { id: certificateDoc.id, ...certificateDoc.data() }
  });
});

