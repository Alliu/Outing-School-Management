import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { existsSync, mkdirSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('tile')
    .setDescription('description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'apiDoc',
    app,
    document,
    //, {jsonDocumentUrl: 'swagger/json',}
  );
  app.enableCors({
    origin: [`${process.env.FRONT_URL}`],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  app.use(cookieParser());
  const uploadDir = './uploads';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
