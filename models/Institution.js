// models/Institution.js
import mongoose from 'mongoose'

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
  uploadedCertificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
}, { timestamps: true })

export default mongoose.model('Institution', institutionSchema)
