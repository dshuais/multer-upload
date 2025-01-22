import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const port = app.get(ConfigService)?.get('PORT') || 8848;

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
