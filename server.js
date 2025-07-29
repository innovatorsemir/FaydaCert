import dotenv from 'dotenv';
dotenv.config();  // Must be at the very top, only if you run locally (skip this in Docker if using env_file)

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import certificateRoutes from './routes/certificateRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

// Check AWS_BUCKET_NAME for debug
console.log('S3 Bucket:', process.env.AWS_BUCKET_NAME);

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/certificates', certificateRoutes);
app.use('/api/auth', otpRoutes);
app.get('/api/certificates', (req, res) => {
  // Replace this with actual DB fetch
  const certificates = [
    { id: 1, name: 'Cert A', issuedTo: 'Alice' },
    { id: 2, name: 'Cert B', issuedTo: 'Bob' },
  ];
  res.json(certificates);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
