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
  @IsString()
  gender: string;

  @IsString()
  birth: string;

  @IsString()
  nickname: string;
}
