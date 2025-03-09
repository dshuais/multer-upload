/*
 * @Author: dushuai
 * @Date: 2025-01-23 01:10:07
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 15:34:16
 * @description: 心平气和
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    JwtModule.register({
      global: true,
      secret: '**&&aabbccdd**', // 秘钥
      signOptions: {
        // 签名配置
        expiresIn: '1h' // 过期时间
      }
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
