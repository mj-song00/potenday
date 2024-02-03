import { User } from 'src/entity/user.entity'; // 실제 사용자 엔터티의 경로로 변경

declare module 'express' {
  interface Request {
    user?: User; // 여기에서 'User' 대신 실제 사용자 엔터티의 타입을 지정
  }
}
