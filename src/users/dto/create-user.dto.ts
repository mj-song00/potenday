import { IsNotEmpty, IsString } from 'class-validator';

export class SignInKakaoDto {
  code: string;
  redirectUri: string;
}

export class UpdateInfoDto {
  gender: string;
  birth: string;
  nickname: string;
}
