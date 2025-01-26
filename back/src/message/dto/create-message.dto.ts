import { message_status } from '@prisma/client';

export class CreateMessageDto {
  writer_id: string;
  receiver_id: string;
  content: string;
  status: message_status;
}
