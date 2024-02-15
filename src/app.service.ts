import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '왜 npm run build가 안되는거지';
  }
}
