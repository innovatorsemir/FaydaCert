// controllers/studentController.js
import Certificate from '../models/Certificate.js'

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentId: req.user._id })
    res.json(certificates)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
