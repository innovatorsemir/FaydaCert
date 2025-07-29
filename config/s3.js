import AWS from 'aws-sdk';

// AWS SDK v2 S3 client setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,      // from env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // from env
  region: process.env.AWS_REGION,                  // from env
});

export default s3;
