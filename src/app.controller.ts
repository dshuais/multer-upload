import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import storage from './utils/storage';

import { RESOURCE_URL } from 'config';
import { AppService } from './app.service';
import CommonResult from './utils/CommonResult';

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
