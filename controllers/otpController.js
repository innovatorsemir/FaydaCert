import { generateOTP, verifyOTP } from '../utils/otpUtil.js';

// Mocked: Send OTP to Fayda user
export const requestOTP = (req, res) => {
  const { faydaId } = req.body;
  if (!faydaId) return res.status(400).json({ message: 'Fayda ID required' });

  const otp = generateOTP(faydaId);
  // TODO: Integrate SMS/email via Fayda API
  console.log(`OTP for ${faydaId}: ${otp}`);

  res.json({ message: 'OTP sent (mocked)', otp }); // Remove `otp` in production
};

export const confirmOTP = (req, res) => {
  const { faydaId, otp } = req.body;

  if (verifyOTP(faydaId, otp)) {
    return res.json({ success: true, message: 'OTP verified' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
  }
};
