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
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  birth: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
