import { Injectable } from '@nestjs/common';
import { media_type } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { mediaAnyDto, mediaProfileDto } from './upload.controller';

@Injectable()
export class UploadService {
  constructor(private prismaService: PrismaService) {}

  async loadProfile(userid: number) {
    const file = await this.prismaService.media.findFirst({
      where: { type: media_type.USER_PROFILE_ID, user_id: userid },
    });
    return file.path;
  }

  async createUserProfileMedia(
    file: Express.Multer.File,
    body: mediaProfileDto,
  ): Promise<string> {
    await this.prismaService.media.create({
      data: {
        alt: file.filename,
        path: file.path,
        type: body.child_id ? media_type.CHILD_ID : media_type.USER_PROFILE_ID,
        user_id: +body.owner_id,
        child_id: +body.child_id,
      },
    });
    return file.path;
  }
  async createAnyMedia(
    file: Express.Multer.File,
    body: mediaAnyDto,
  ): Promise<string> {
    await this.prismaService.media.create({
      data: {
        alt: file.filename,
        path: file.path,
        type: media_type.ANY,
        user_id: +body.owner_id,
      },
    });
    return file.path;
  }
}
