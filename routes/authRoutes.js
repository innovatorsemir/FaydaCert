// routes/authRoutes.js
import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { handleFaydaCallback } from "../controllers/faydaAuthController.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post("/fayda/callback", handleFaydaCallback);
export default router
