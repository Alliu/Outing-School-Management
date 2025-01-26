import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageService } from '../message/message.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
@Module({
  imports: [PrismaModule],
  providers: [ChatGateway, MessageService, UserService, AuthService],
})
export class ChatModule {}
