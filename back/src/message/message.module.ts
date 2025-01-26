import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatGateway } from 'src/chat/chat.gateway';
import { EvenementService } from 'src/evenement/evenement.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { MessageService } from './message.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [MessageService],
})
export class MessageModule {}
