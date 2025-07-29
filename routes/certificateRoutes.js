import express from 'express';
import { addCertificate, verifyCertificate } from '../controllers/certificateController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();



router.post('/add', upload.single('file'), addCertificate);
router.post('/verify', verifyCertificate);
router.get('/', (req, res) => {
  res.json([
    { id: '1', name: 'Cert A', issuedTo: 'Alice' },
    { id: '2', name: 'Cert B', issuedTo: 'Bob' }
  ]);
});

// router.post('/upload', upload.single('certificate'), (req, res) => {
//   try {
//     res.json({
//       message: 'File uploaded successfully',
//       fileUrl: req.file.location, // S3 URL
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Upload failed' });
//   }
// });




export default router;
