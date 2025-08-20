import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  studentFaydaId: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  degree: { type: String, required: true },
  gpa: { type: String, required: true },
  dateIssued: { type: Date, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: String, required: true }, // institution name or ID
  txHash: { type: String }  // blockchain transaction hash
}, { timestamps: true });

export default mongoose.model("Certificate", certificateSchema);
