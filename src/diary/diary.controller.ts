import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/users/user.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/decorators/user.decorators';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  //한글 -> 영어 번역
  @Post('translation-text')
  @Roles(ROLE.USER)
  async translation(@Body('input') input: string) {
    const translatedSentence = await this.diaryService.papagoTranslation(input);
    return translatedSentence;
  }

  //이미지 생성
  @Post('generate-image')
  @Roles(ROLE.USER)
  async generateImage(@Body('input') input: string) {
    const negativePrompt = `dark, gloomy, without text`;
    const context = `${input}, by crayon`;
    try {
      const response = await this.diaryService.createImage(
        context,
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
  @Roles(ROLE.USER)
  async createDiary(
    @Body() createDiaryDto: CreateDiaryDto,
    @User() user: UserEntity,
  ) {
    return this.diaryService.createDiary(createDiaryDto, user);
  }

  // /:id 가져오기
  @Get('/get-diary/:id')
  @Roles(ROLE.USER)
  async getDiary(@Param('id') id: string) {
    return this.diaryService.findOne(+id);
  }

  //일기 수정
  @Patch('/edit-diary/:id')
  @Roles(ROLE.USER)
  async editDiary(
    @Param('id') id: string,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ) {
    return this.diaryService.editDiary(+id, updateDiaryDto);
  }

  // 일기 삭제
  @Delete('/delete-diary/:id')
  @Roles(ROLE.USER)
  async deleteDiary(@Param('id') id: string) {
    return this.diaryService.deleteDiary(+id);
  }
}
