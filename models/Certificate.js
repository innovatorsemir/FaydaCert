import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  studentName: String,
  institution: String,
  degree: String,
  hash: String,
  faydaId: String,
  issuedAt: Date,
});

export default mongoose.model('Certificate', certificateSchema);
