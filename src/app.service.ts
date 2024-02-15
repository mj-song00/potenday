import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '이젠 바뀌었으면 좋겠다ㅜ';
  }
}
