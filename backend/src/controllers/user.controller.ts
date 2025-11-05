import { Response } from 'express';
import { db } from '../config/firebase';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;

  const userDoc = await db.collection('users').doc(userId!).get();

  if (!userDoc.exists) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: { id: userDoc.id, ...userDoc.data() }
  });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;
  const { firstName, lastName, phone, country } = req.body;

  const updateData: any = {
    updatedAt: new Date().toISOString()
  };

  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (phone) updateData.phone = phone;
  if (country) updateData.country = country;

  await db.collection('users').doc(userId!).update(updateData);

  const updatedDoc = await db.collection('users').doc(userId!).get();

  res.status(200).json({
    success: true,
    data: { id: updatedDoc.id, ...updatedDoc.data() }
  });
});

export const getUserExams = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;

  const snapshot = await db
    .collection('examResults')
    .where('userId', '==', userId)
    .orderBy('completedAt', 'desc')
    .get();

  const exams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    success: true,
    data: exams
  });
});

