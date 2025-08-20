import express from 'express';
import { verifyCertificateByFayda } from '../controllers/verifyController.js';

const router = express.Router();

router.get('/verify-certificate', verifyCertificateByFayda);

export default router;
