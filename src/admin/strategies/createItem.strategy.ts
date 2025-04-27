import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';

@Injectable()
export class ItemStrategy {
  private s3Client = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private readonly bucket = process.env.AWS_BUCKET_NAME;

  public readonly upload = multer({
    storage: multerS3({
      s3: this.s3Client,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        cb(null, file.originalname); // You can customize this
      },
    }),
  });

  async validate(payload: any) {
    // Not needed unless you're implementing a strategy like JWT/Auth
    return payload;
  }
}
