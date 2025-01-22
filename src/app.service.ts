import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello，Multer Upload！<br />
    This is a public service of image resources.<br/ >
    private.
    `;
  }
}
