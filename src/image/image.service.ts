import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CreateImageDto } from './dto/image.dto';

@Injectable()
export class ImageService {
  private readonly REST_API_KEY = process.env.REST_API_KEY;
  private readonly KAKAO_API_URL =
    'https://api.kakaobrain.com/v2/inference/karlo/t2i';

  constructor(private readonly httpService: HttpService) {}

  async generateImage(
    createImageDto: CreateImageDto,
    negativePrompt: string,
  ): Promise<AxiosResponse<any>> {
    const { input } = createImageDto;
    const prompt =
      'A picture drawn by a 8-year-old' +
      `${input}` +
      `don't go out of the picture`;
    try {
      const response = await this.httpService
        .post(
          this.KAKAO_API_URL,
          {
            prompt,
            negative_prompt: negativePrompt,
          },
          {
            headers: {
              Authorization: `KakaoAK ${this.REST_API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      return response;
    } catch (error) {
      console.error('Error calling Kakao Brain API:', error);
      throw error;
    }
  }
}
