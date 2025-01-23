import IErrorCode from './IErrorCode';
import ResultCode from './ResultCode';

/**
 * 通用处理返回结果
 */
export default class CommonResult<T = any> {
  constructor(
    public code: number,
    public msg: string,
    public data?: T | null
  ) {
    this.code = code;
    this.msg = msg;
    this.data = data || null;
  }

  /**
   * 操作成功
   * @param data
   * @param IerrorCode 默认200
   * @returns CommonResult
   */
  public static success<T = any>(
    data?: T,
    IerrorCode?: IErrorCode
  ): CommonResult<T> {
    return new CommonResult(
      IerrorCode?.code || ResultCode.SUCCESS.code,
      IerrorCode?.msg || ResultCode.SUCCESS.msg,
      data
    );
  }

  /**
   * 操作失败
   * @param IerrorCode 默认500
   * @returns CommonResult
   */
  public static failed<T = any>(
    IerrorCode?: IErrorCode,
    msg?: string,
    data?: T
  ): CommonResult<T> {
    return new CommonResult(
      IerrorCode?.code || ResultCode.FAILED.code,
      msg || IerrorCode?.msg || ResultCode.FAILED.msg,
      data
    );
  }

  /**
   * 参数验证失败 400
   * @param msg
   * @returns CommonResult
   */
  public static validateFailed(msg?: string): CommonResult {
    return new CommonResult(
      ResultCode.VALIDATE_FAILED.code,
      msg || ResultCode.VALIDATE_FAILED.msg
    );
  }

  /**
   * 未登录 401
   * @param data 未登录的时候返回的数据
   * @returns CommonResult
   */
  public static unauthorized<T = any>(data?: T): CommonResult<T> {
    return new CommonResult(
      ResultCode.UNAUTHORIZED.code,
      ResultCode.UNAUTHORIZED.msg,
      data
    );
  }
}
