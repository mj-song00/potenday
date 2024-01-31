import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { KalroService } from 'src/service/kalro/karlo.service';

@Injectable()
export class DiaryService {
  constructor(private readonly kalroService: KalroService) {}

  async createImage(input: string, negativePrompt: string) {
    if (!input) throw new Error('Bad Request');

    const image = await this.kalroService.createImage(input, negativePrompt);

    return image;
  }
}
