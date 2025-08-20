// app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import verifyRoutes from './routes/verifyRoutes.js';
import certificateRoutes from "./routes/certificateRoutes.js";
// import other routes...

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', verifyRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/upload', uploadRoutes)
app.use("/uploads", express.static("uploads"));

app.use("/api/certificates", certificateRoutes);
// mount other routes similarly

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
