import { Body, Controller, Post } from '@nestjs/common';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  //이미지 생성
  @Post('generate-image')
  async generateImage(@Body('input') input: string) {
    const negativePrompt = `dark, gloomy`;

    try {
      const response = await this.diaryService.createImage(
        input,
        negativePrompt,
      );

      const imageUrl = response.data.images[0].image;

      return { imageUrl };
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Failed to generate image.' };
    }
  }
}
