import { registerAs } from '@nestjs/config';
require('dotenv').config();

export default registerAs('AwsS3config', () => ({
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsAccesKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_S3_REGION,
}));
