/*
 * @Author: dushuai
 * @Date: 2025-01-23 01:10:07
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 11:58:29
 * @description: 心平气和
 */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import HttpExceptionFilter from './filters/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const port = app.get(ConfigService)?.get('PORT') || 8848;

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
