import { Request, Response } from 'express';
import { auth, db } from '../config/firebase';
import { asyncHandler } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role = 'student' } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  const userRecord = await auth.createUser({
    email,
    password,
    displayName: `${firstName} ${lastName}`
  });

  await auth.setCustomUserClaims(userRecord.uid, { role });

  await db.collection('users').doc(userRecord.uid).set({
    email,
    firstName,
    lastName,
    role,
    createdAt: new Date().toISOString(),
    examsTaken: 0,
    certificatesEarned: 0
  });

  res.status(201).json({
    success: true,
    data: {
      uid: userRecord.uid,
      email: userRecord.email,
      role
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password required'
    });
  }

  // Note: Firebase Admin SDK doesn't support password login
  // Client should use Firebase Auth SDK directly
  res.status(200).json({
    success: true,
    message: 'Use Firebase Auth SDK on client for login'
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'Token required'
    });
  }

  const decodedToken = await auth.verifyIdToken(token, true);

  res.status(200).json({
    success: true,
    data: { uid: decodedToken.uid }
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

