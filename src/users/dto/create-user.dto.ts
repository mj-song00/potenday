import { IsNotEmpty, IsString } from 'class-validator';

export class SignInKakaoDto {
  code: string;
  redirectUri: string;
}

export class InfoDto {
  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  birth: string;
}
