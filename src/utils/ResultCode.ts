import { HttpStatus } from '@nestjs/common';
import IErrorCode from './IErrorCode';

/**
 * 返回错误码数据枚举
 */
const ResultCode = {
  SUCCESS: new IErrorCode(HttpStatus.OK, '操作成功'), // 200
  FAILED: new IErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, '操作失败'), // 500
  VALIDATE_FAILED: new IErrorCode(HttpStatus.BAD_REQUEST, '参数校验失败'), // 400
  UNAUTHORIZED: new IErrorCode(HttpStatus.UNAUTHORIZED, '未登录'), // 401
  FORBIDDEN: new IErrorCode(HttpStatus.FORBIDDEN, '没有权限'), // 403

  CUSTOM_FAILED: new IErrorCode(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'This is a custom message'
  )
};

export default ResultCode;
