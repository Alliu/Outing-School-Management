import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { CheckUserMiddleware } from 'src/middleware/user.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController], 
  providers: [NotificationService, UserService], 
})
export class NotificationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserMiddleware)
      .forRoutes({ path: 'notifications', method: RequestMethod.POST });
  }
}
