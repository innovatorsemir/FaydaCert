// routes/studentRoutes.js
import express from 'express'
import { getMyCertificates } from '../controllers/studentController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.get('/certificates', protect, authorizeRoles('student'), getMyCertificates)

export default router
