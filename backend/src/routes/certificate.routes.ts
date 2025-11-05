import express from 'express';
import { generateCertificate, getCertificate } from '../controllers/certificate.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/generate', authenticate, generateCertificate);
router.get('/:certificateId', getCertificate);

export default router;

