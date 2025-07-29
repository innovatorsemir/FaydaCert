import express from 'express';
import { requestOTP, confirmOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/request-otp', requestOTP);   // Step 1
router.post('/verify-otp', confirmOTP);    // Step 2

export default router;
