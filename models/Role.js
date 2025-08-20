// models/Role.js
import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [String], // e.g., ['view_certificates', 'upload_certificates']
})

export default mongoose.model('Role', roleSchema)
