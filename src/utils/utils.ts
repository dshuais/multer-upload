/*
 * @Author: dushuai
 * @Date: 2025-03-09 11:56:41
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 11:59:41
 * @description: 心平气和
 */
import { json2params, params2json } from 'turboutils';
import { ERROR_TYPE } from 'src/filters/HttpExceptionFilter';

/**
 * 统一错误类型
 */
export type UnifyError = {
  type: keyof typeof ERROR_TYPE;
  msg: string;
};

export function json2err(param: string): UnifyError {
  return params2json(param) as UnifyError;
}

export function err2json(param: UnifyError): string {
  return json2params(param);
}
