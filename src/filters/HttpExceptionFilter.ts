/*
 * @Author: dushuai
 * @Date: 2025-01-25 22:29:04
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 16:36:51
 * @description: HttpException 错误处理过滤器，暂时仅用于处理未授权错误
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';

import CommonResult from 'src/utils/CommonResult';
import { json2err } from 'src/utils/utils';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse(),
      status = exception.getStatus(),
      unifyError = exception.response,
      { type, msg } = json2err(unifyError);

    if (ERROR_TYPE[type]) {
      response.status(status).json(new CommonResult(ERROR_TYPE[type], msg));
    } else {
      response.status(status).json(unifyError);
    }
  }
}

/**
 * 错误类型
 */
export enum ERROR_TYPE {
  UNAUTHORIZED = 401
}
