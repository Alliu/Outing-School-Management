import { BadRequestException, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register(
      {
        storage: diskStorage({
          destination: join(__dirname, 'uploads'), // Dossier où stocker les fichiers
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname); // Extension du fichier
            callback(null, `${uniqueSuffix}${ext}`);
          },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(
              new BadRequestException('Only image files are allowed!'),
              false,
            );
          }
          callback(null, true);
        },
      }, 
    ),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
