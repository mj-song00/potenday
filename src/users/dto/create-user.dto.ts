import { IsNotEmpty, IsString } from 'class-validator';

export class SignInKakaoDto {
  code: string;
  redirectUri: string;
}

export class InfoDto {
  gender: string;
  birth: string;
}
