import { CreateDiaryDto } from './dto/image.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  //한글 -> 영어 번역
  @Post('translation-text')
  async translation(@Body('input') input: string) {
    const translatedSentence = await this.diaryService.papagoTranslation(input);
    return translatedSentence;
  }

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

  //번역문, 사진, 기분, 날짜, 날씨 저장
  @Post('create-diary')
  async createDiary(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.createDiary(createDiaryDto);
  }

  // /:id 가져오기
  @Get('/get-diary/:id')
  async getDiary(@Param('id') id: string) {
    return this.diaryService.findOne(+id);
  }
}
