import { Injectable, Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/schemas/itemSchema';
import { itemDTO } from './dto/item.dto';
import { BadRequestException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import awsS3Config from './config/aws.s3.config';
@Injectable()
export class AdminService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    @InjectRepository(Item)
    private itemRepo: MongoRepository<Item>,
    private readonly configService: ConfigService,
    @Inject(awsS3Config.KEY) // <-- This tells Nest how to resolve the config
    private awsConfig: ConfigType<typeof awsS3Config>,
  ) {}

  async getItems(itemDTO: itemDTO) {
    const findItems = await this.itemRepo.find();
    if (findItems.length <= 0) {
      throw new BadRequestException('no items found');
    }
    return findItems;
  }
  async createItems(itemDTO: itemDTO) {
    const { name, price, description, image } = itemDTO;

    const fileName = `items/${Date.now()}-${name.replace(/\s+/g, '-')}.jpg`;

    await this.upload(fileName, image);

    const newItem = {
      name,
      price,
      description,
      imageUrl: `https://parcticingnestjs.s3.eu-north-1.amazonaws.com/${fileName}`,
    };

    // 4. Save it into the repository
    const savedItem = await this.itemRepo.save(newItem);

    return { message: 'item created successfully' };
  }
  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.awsBucketName,
        Key: fileName,
        Body: file,
      }),
    );
  }
}
