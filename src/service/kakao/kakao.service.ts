import { SignInKakaoDto } from './../../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as QueryString from 'qs';
import * as jwt from 'jsonwebtoken';
import { GetTokensData } from './kakao.response';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class KakaoService {
  private readonly kauth: AxiosInstance;
  private readonly kapi: AxiosInstance;
  private readonly REST_API_KEY = process.env.KAKAO_REST_API_KEY;
  private readonly ADMIN_KEY = process.env.KAKAO_ADMIN_KEY;

  constructor() {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    this.kauth = axios.create({ baseURL: 'https://kauth.kakao.com', headers });
    this.kapi = axios.create({ baseURL: 'https://kapi.kakao.com', headers });
  }

  async signIn(signInArgs: SignInKakaoDto) {
    const { code, redirectUri } = signInArgs;
    if (!code || !redirectUri) throw new Error('InsufficientParameters');

    const tokens = await this.getTokens(code, redirectUri);
    const decodedToken = jwt.decode(tokens.id_token) as JwtPayload; // as 키워드를 사용하여 강제로 형변환
    const { sub: kakaoId, image } = decodedToken;

    return { kakaoId, image };
  }

  async getTokens(code: string, redirectUri: string): Promise<GetTokensData> {
    const url = '/oauth/token';
    const data = QueryString.stringify({
      grant_type: 'authorization_code',
      client_id: this.REST_API_KEY,
      redirect_uri: redirectUri,
      code,
    });

    // 여기서 실제로 토큰을 얻는 로직을 구현하고, 토큰을 반환
    const response = await this.kauth.post<GetTokensData>(url, data);
    // 여기서 토큰에서 필요한 값을 추출하여 반환
    return response.data;
  }

  async unlink(kakaoId: string) {
    const url = '/v1/user/unlink';
    const data = QueryString.stringify({
      target_id_type: 'user_id',
      target_id: kakaoId,
    });
    const headers = { Authorization: `KakaoAK ${this.ADMIN_KEY}` };

    await this.kapi.post(url, data, { headers });

    return kakaoId;
  }

  async getMe(kakaoId: string) {
    const url = '/v2/user/me';
    const data = QueryString.stringify({
      target_id_type: 'user_id',
      target_id: kakaoId,
    });
    const headers = { Authorization: `KakaoAK ${this.ADMIN_KEY}` };
    const response = await this.kapi.post(url, data, { headers });
    const me = response.data;

    return me;
  }
}
