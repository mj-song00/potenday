import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as base64 from 'base64-js';
import * as sharp from 'sharp';
import * as path from 'path';
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
      image_format: 'png',
    };

    const headers = { Authorization: `KakaoAK ${this.REST_API_KEY}` };

    const response = await this.api.post(url, data, { headers });
    const image = response;
    return image;
  }
}
