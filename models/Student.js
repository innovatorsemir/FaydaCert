// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  faydaId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,   // for OTP
});

export default mongoose.model("Student", studentSchema);
