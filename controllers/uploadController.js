import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import Certificate from '../models/Certificate.js'

// Initialize AWS S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

// Example helper to generate unique faydaId (adjust to your logic)
function generateFaydaId() {
  return `FAYDA-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export const handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  // Validate required body fields
  const { institutionId, details } = req.body
  if (!institutionId || !details) {
    return res.status(400).json({ message: 'institutionId and details are required' })
  }

  // Assume req.user is populated by your auth middleware (JWT)
  const studentId = req.user?.id
  if (!studentId) {
    return res.status(401).json({ message: 'Unauthorized: student info missing' })
  }

  const fileName = `certificates/${Date.now()}_${req.file.originalname}`

  try {
    // Try uploading to AWS S3
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ACL: 'private',
        ContentType: req.file.mimetype,
      },
    })

    const result = await upload.done()

    // Create certificate record in MongoDB without file data (just metadata + URL)
    const newCert = await Certificate.create({
      studentId,
      institutionId,
      details: JSON.parse(details), // assuming details sent as JSON string
      faydaId: generateFaydaId(),
      file: {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      },
      hash: '', // optionally add blockchain hash later
      signed: false,
      correctionRequests: [],
      // You may want to store the S3 URL somewhere else or add a dedicated field
    })

    return res.status(200).json({
      message: 'File uploaded successfully to AWS S3',
      fileUrl: result.Location,
      key: result.Key,
      certificate: newCert,
      storage: 'aws',
    })
  } catch (awsError) {
    console.error('AWS upload failed:', awsError)

    // Fallback: Save file & certificate info directly to MongoDB
    try {
      const newCert = await Certificate.create({
        studentId,
        institutionId,
        details: JSON.parse(details),
        faydaId: generateFaydaId(),
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          filename: req.file.originalname,
        },
        hash: '',
        signed: false,
        correctionRequests: [],
      })

      return res.status(200).json({
        message: 'File uploaded successfully to MongoDB',
        certificate: newCert,
        storage: 'mongodb',
      })
    } catch (mongoError) {
      console.error('MongoDB upload failed:', mongoError)
      return res.status(500).json({
        message: 'File upload failed on both AWS and MongoDB',
        error: mongoError.message || mongoError,
      })
    }
  }
}
