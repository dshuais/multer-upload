/*
 * @Author: dushuai
 * @Date: 2025-02-05 22:14:04
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 16:17:38
 * @description: Controller
 */
import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';

import { RESOURCE_URL } from 'config';
import storage from './utils/storage';
import { AppService } from './app.service';
import CommonResult from './utils/CommonResult';
import { AuthGuard } from './auth.guard';
import { dayjs } from 'turboutils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('getToken')
  async getToken() {
    const token: string = await this.jwtService.signAsync({
      validUntil: dayjs().add(1, 'minutes').valueOf(),
      msg: 'For private multer-upload use only.'
    });
    return CommonResult.success(token);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 9, {
      dest: './files',
      limits: {
        fieldSize: 1024 * 1024 * 10 // 10MB
      },
      storage
    })
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>
    // @Body() body: Params
  ) {
    // console.log('body:>> ', body);
    // console.log('files:>> ', files);
    const filePaths = files.map(
      (file) => `${RESOURCE_URL}/${file.path.split('files/')[1]}`
    );
    console.log('filePaths:>> ', filePaths);
    return CommonResult.success(filePaths.join(','));
  }
}

// type Params = {
//   fileName: string;
// };
