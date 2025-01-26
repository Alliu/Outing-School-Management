import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { EvenementService } from 'src/evenement/evenement.service';
import { NotificationService } from 'src/notification/notification.service';
import { MessageService } from 'src/message/message.service';
import { MessageModule } from 'src/message/message.module';
import { CheckUserMiddleware } from 'src/middleware/user.middleware';

@Module({
  imports: [PrismaModule, MessageModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    EvenementService,
    NotificationService,
    MessageService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserMiddleware).forRoutes('user');
  }
}
