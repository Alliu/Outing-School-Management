import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { message, message_status } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async save(createMessageDto: CreateMessageDto) {
    return await this.prismaService.message.create({
      data: {
        writer_id: +createMessageDto.writer_id,
        receiver_id: +createMessageDto.receiver_id,
        content: createMessageDto.content,
        status: createMessageDto.status,
      },
    });
  }

  async userMessages(id: number, contactid: number): Promise<message[] | null> {
    console.log(id);
    return this.prismaService.message.findMany({
      where: {
        writer_id: { in: [id, contactid] },
        receiver_id: { in: [id, contactid] },
      },
      orderBy: { id: 'desc' },
    });
  }
}
