import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from './upload.service';
import { Jimp } from 'jimp';

export class mediaProfileDto {
  owner_id: string;
  child_id?: string;
}

export class mediaAnyDto {
  owner_id: number;
}
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: mediaProfileDto,
  ): Promise<string> {
    const img = await Jimp.read(file.path);
    img.resize({ w: 300 });
    await img.write(`./uploads/${file.filename}`);

    await this.uploadService.createUserProfileMedia(file, body);
    console.log({
      originalName: file.originalname,
      fileName: file.filename,
      size: file.size,
      type: file.mimetype,
      path: file.destination + file.filename,
    });
    return file.path;
  }

  @Post('/miscellaneous')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAnyFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: mediaAnyDto,
  ) {
    await this.uploadService.createAnyMedia(file, body);
    console.log({
      originalName: file.originalname,
      fileName: file.filename,
      size: file.size,
      type: file.mimetype,
      path: file.path,
    });
    return file.path;
  }
}
