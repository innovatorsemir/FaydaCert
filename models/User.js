// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'institution', 'employer', 'admin'], required: true },
  contactInfo: {
    phone: String,
    email: String,
  },
  verificationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VerificationLog' }],
  consentedCertificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
}, { timestamps: true })

export default mongoose.model('User', userSchema)
