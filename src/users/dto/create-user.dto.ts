import { IsNotEmpty, IsString } from 'class-validator';

export class SignInKakaoDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  redirectUri: string;
}

export class UpdateInfoDto {
  gender: string;
  birth: string;
  nickname: string;
}
