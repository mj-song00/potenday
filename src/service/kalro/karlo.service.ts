import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KalroService {
  private readonly api: AxiosInstance;
  private readonly REST_API_KEY = process.env.KAKAO_REST_API_KEY;

  constructor() {
    const headers = {
      'Content-Type': 'application/json',
    };
    this.api = axios.create({
      baseURL: 'https://api.kakaobrain.com',
      headers,
    });
  }

  async createImage(input: string, negativePrompt: string) {
    if (!input) throw new Error('noPrompt');
    const image = await this.getImage(input, negativePrompt);

    return image;
  }

  async getImage(input: string, negativePrompt: string) {
    //QueryString.stringify 삭제
    const url = '/v2/inference/karlo/t2i';
    const data = {
      prompt: input,
      negative_prompt: negativePrompt,
    };

    const headers = { Authorization: `KakaoAK ${this.REST_API_KEY}` };

    const response = await this.api.post(url, data, { headers });
    const image = response;
    return image;
  }
}
