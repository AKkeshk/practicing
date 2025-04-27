import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { itemDTO } from './dto/item.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({
            fileType: 'image/*',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.adminService.upload(file.originalname, file.buffer);
    return { message: 'uploaded successfully' };
  }

  @Post('add-item')
  @UseInterceptors(FileInterceptor('image'))
  addItem(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const itemDTO = {
      name: body.name,
      price: body.price,
      description: body.description,
      image: file.buffer, // assuming you want the file buffer
    };
    return this.adminService.createItems(itemDTO);
  }
}
