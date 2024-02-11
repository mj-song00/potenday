import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as base64 from 'base64-js';
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

  async createImage(context: string, negativePrompt: string) {
    if (!context) throw new Error('noPrompt');
    const image = await this.getImage(context, negativePrompt);

    return image;
  }

  async getImage(context: string, negativePrompt: string) {
    //QueryString.stringify 삭제

    const url = '/v2/inference/karlo/t2i';
    const data = {
      prompt: context,
      negative_prompt: negativePrompt,
      return_type: 'base64_string',
    };

    const headers = { Authorization: `KakaoAK ${this.REST_API_KEY}` };

    const response = await this.api.post(url, data, { headers });
    const image = response;
    return image;
  }

  // Base64 문자열을 이미지로 디코딩하는 함수
  async stringToImage(base64String: string, outputPath: string): Promise<void> {
    const imgBuffer = Buffer.from(base64String, 'base64'); // Base64를 Buffer로 디코딩
    console.log('buffer:' + Buffer.from(base64.toByteArray(base64String)));
    return await fs.promises.writeFile(outputPath, imgBuffer); // Buffer를 파일로 쓰기
  }
}
