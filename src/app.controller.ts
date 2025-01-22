import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 9, {
      dest: './uploads'
    })
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: Params
  ) {
    console.log('body:>> ', body);
    console.log('files:>> ', files);
    // return files;
  }
}

type Params = {
  fileName: string;
};
