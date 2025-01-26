import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { PrismaModule } from 'prisma/prisma.module';
import { EvenementController } from './evenement.controller';
import { UserService } from 'src/user/user.service';
import { CheckUserMiddleware } from 'src/middleware/user.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [EvenementController],
  providers: [EvenementService, UserService],
})
export class EvenementModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserMiddleware).forRoutes('event');
  }
}
