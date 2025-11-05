import admin from 'firebase-admin';

export const initializeFirebase = () => {
  const isEmulator = process.env.NODE_ENV === 'development';

  if (isEmulator) {
    // Use Firebase Emulator
    process.env.FIRESTORE_EMULATOR_HOST = process.env.FIREBASE_EMULATOR_FIRESTORE_HOST || 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_EMULATOR_AUTH_HOST || 'localhost:9099';
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_EMULATOR_STORAGE_HOST || 'localhost:9199';

    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'exam-platform-dev'
    });

    console.log('🔥 Firebase initialized with Emulator Suite');
  } else {
    // Production: use service account
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });

    console.log('🔥 Firebase initialized for production');
  }
};

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export default admin;

