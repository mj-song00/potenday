import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';

@Injectable()
export class DiaryService {
  constructor(
    private readonly kalroService: KalroService,
    private readonly papagoService: PapagoService,
  ) {}

  //파파고 번역
  async papagoTranslation(input: string) {
    if (!input) throw new Error('Bad Request');

    const text = await this.papagoService.translation(input);
    return text;
  }

  //이미지 생성
  async createImage(input: string, negativePrompt: string) {
    if (!input) throw new Error('Bad Request');

    const image = await this.kalroService.createImage(input, negativePrompt);
    return image;
  }
}
