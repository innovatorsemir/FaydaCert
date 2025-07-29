import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js';
import dotenv from 'dotenv';
dotenv.config();
// Debug to check bucket name at runtime
console.log('AWS_BUCKET_NAME:', process.env.AWS_BUCKET_NAME);

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,   // must be set in env
    acl: 'private',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filename = `certificates/${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

export default upload;
