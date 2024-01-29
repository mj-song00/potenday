import { DiaryService } from './../diary/diary.service';
import { Body, Controller, Get } from '@nestjs/common';
import { CreateImageDto } from 'src/diary/dto/image.dto';

@Controller('diary')
export class ImageController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('generate-image')
  async generateImage(@Body() createImageDto: CreateImageDto) {
    const negativePrompt = 'dark' + 'gloomy';

    try {
      const response = await this.diaryService.generateImage(
        createImageDto,
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
