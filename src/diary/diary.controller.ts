import { FindOperator } from 'typeorm';
import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/users/user.enum';
import { UserEntity } from 'src/entity/user.entity';
import { User } from 'src/decorators/user.decorators';
import { FileInterceptor } from '@nestjs/platform-express';

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
    const negativePrompt = `text, dirty, scared, ugly,sordid`;
    const context = `${input}, It looks like it was drawn with crayons by a child under 7 years old, 
    naturally, only pictures`;
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
  @UseInterceptors(FileInterceptor('file'))
  async createDiary(
    @Body() createDiaryDto: CreateDiaryDto,
    @User() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.diaryService.createDiary(createDiaryDto, user, file);
  }

  // 개별 다이어리 가져오기
  @Get('/get-diary/:id')
  @Roles(ROLE.USER)
  async getDiary(@Param('id') id: string) {
    return this.diaryService.findOne(+id);
  }

  // type 1인 diary가 public
  @Get('/get-diaries/:type')
  @Roles(ROLE.USER)
  async getDiaries(@Param('type') type: '0' | '1') {
    if (type !== '0' && type !== '1') {
      throw new BadRequestException('Invalid diary type');
    }
    const isPublic: boolean | FindOperator<boolean> = type === '1';
    return this.diaryService.findDiariesByType(isPublic);
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

  //일기만 불러오기
  @Get('diaries')
  @Roles(ROLE.USER)
  async diaries(@User() user: UserEntity) {
    return this.diaryService.findDiaries(user);
  }

  // 좋아요 기능 설정
}
