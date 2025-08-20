import express from 'express'
import  { protect }  from '../middlewares/authMiddleware.js' // your JWT middleware
import { uploadCertificate } from '../middlewares/uploadMiddleware.js'
import { handleUpload } from '../controllers/uploadController.js'

const router = express.Router()

router.post(
  '/certificate',
    // << Make sure this is here
  uploadCertificate,
  handleUpload
)

export default router
