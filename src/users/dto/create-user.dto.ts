import { IsNotEmpty, IsString } from 'class-validator';

export class SignInKakaoDto {
  @IsString()
  @IsNotEmpty()
  code: string;
  redirectUri: string;
}

export class UpdateInfoDto {
  @IsString()
  @IsNotEmpty()
  gender: string;
  birth: string;
  nickname: string;
}
