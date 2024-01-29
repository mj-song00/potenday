import { SignInKakaoDto } from './../../users/dto/create-user.dto';

export type SignInArgs = SignInKakaoDto;

export type OAuthToken = {
  token_type: 'bearer';
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
};

export type KakaoMe = {
  id: number;
  connected_at: string;
  kakao_account: {
    profile_nickname: string;
  };
};
