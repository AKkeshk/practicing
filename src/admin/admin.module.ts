import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller'; // <-- You probably forgot this
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Item } from 'src/schemas/itemSchema';
import awsS3Config from './config/aws.s3.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    ConfigModule.forFeature(awsS3Config),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
