import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { HttpDataService } from 'src/http/http.service';
import { MailService } from 'src/mail/mail.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthGuard } from './guards/auth.guard';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      //signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    HttpDataService,
    UploadService,
    UserService,
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AuthModule {}
