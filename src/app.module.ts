import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '../..', 'files')
      }
      // {
      //   rootPath: join(__dirname, '..', 'public'),
      //   serveRoot: '/'
      // }
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
