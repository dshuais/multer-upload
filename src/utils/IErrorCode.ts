/**
 * 错误码接口
 */
export default class IErrorCode {
  constructor(
    public code: number,
    public msg: string
  ) {
    this.code = code;
    this.msg = msg;
  }
}
