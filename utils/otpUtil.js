const otpStore = {}; // In-memory OTP store

export const generateOTP = (faydaId) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[faydaId] = { otp, createdAt: Date.now() };
  return otp;
};

export const verifyOTP = (faydaId, inputOtp) => {
  const record = otpStore[faydaId];
  if (!record) return false;

  const isValid = record.otp === inputOtp && (Date.now() - record.createdAt) < 3 * 60 * 1000; // 3 min
  if (isValid) delete otpStore[faydaId];
  return isValid;
};
