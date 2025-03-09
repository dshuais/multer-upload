/*
 * @Author: dushuai
 * @Date: 2025-01-22 23:57:54
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-09 17:00:22
 * @description: token 验证守卫
 */
import {
  Injectable,
  ExecutionContext,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { TOKEN_KEY } from 'config';
import { err2json } from './utils/utils';
import { dayjs } from 'turboutils';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    try {
      const accessToken = req.get(TOKEN_KEY);

      if (!accessToken) {
        throw new HttpException(
          err2json({ type: 'UNAUTHORIZED', msg: '请先登录' }),
          HttpStatus.OK
        );
      }
      const user = await this.jwtService.verifyAsync(accessToken);

      if (!user.validUntil || dayjs().isAfter(dayjs(user.validUntil))) {
        throw new HttpException(
          err2json({ type: 'UNAUTHORIZED', msg: 'Token expired' }),
          HttpStatus.OK
        );
      }

      if (user) {
        req.user = user;
        return true;
      }
    } catch (error) {
      console.error('error:>> ', error);
      if (error.response) {
        throw new HttpException(error.response, HttpStatus.OK);
      } else {
        throw new HttpException(
          err2json({ type: 'UNAUTHORIZED', msg: 'Invalid token' }),
          HttpStatus.OK
        );
      }
    }
  }
}
