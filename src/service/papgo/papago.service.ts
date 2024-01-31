import * as QueryString from 'qs';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PapagoService {
  private readonly naver: AxiosInstance;
  private readonly CLIENT_ID = process.env.PAPAGO_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.PAPAGO_CLIENT_SECRET;

  constructor() {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-NCP-APIGW-API-KEY-ID': `${this.CLIENT_ID}`,
      'X-NCP-APIGW-API-KEY': `${this.CLIENT_SECRET}`,
    };
    this.naver = axios.create({
      baseURL: 'https://naveropenapi.apigw.ntruss.com',
      headers,
    });
  }

  async translation(input: string) {
    if (!input) throw new Error('Parameta Does not exsist');

    const translatedIntoEnglish = await this.translator(input);
    return translatedIntoEnglish;
  }

  async translator(input: string) {
    const url = '/nmt/v1/translation';
    const data = {
      source: 'auto',
      target: 'en',
      text: input,
    };
    const response = await this.naver.post(url, data);
    return response.data;
  }
}
