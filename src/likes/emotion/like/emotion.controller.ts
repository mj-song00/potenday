import { ROLE } from 'src/users/user.enum';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { EmotionService } from './emotion.service';

@Controller('emotion')
export class EmotionController {
  constructor(private emotionService: EmotionService) {}

  //다이어리 감정에 공감하기
  @Roles(ROLE.USER)
  @Post('/:diaryId/:emotion')
  fineEmotion(
    @Param('diaryId') diaryId: string,
    @Param('emotion') emotion: string,
    @User() user: UserEntity,
  ) {
    return this.emotionService.getFineDiary(+diaryId, emotion, user);
  }

  //다이어리별 감정 불러오기
  @Roles(ROLE.USER)
  @Get('/:diaryId')
  getEmotion(
    @Param('diaryId') diaryId: string,
    @Param('emotion') emotion: string,
  ) {
    return this.emotionService.getEmotion(+diaryId, emotion);
  }

  //다이어리 감정 불러오기
  @Roles(ROLE.USER)
  @Get('/:diaryId')
  getEmotions(@Param('diaryId') diaryId: string) {
    return this.emotionService.getEmotions(+diaryId);
  }
}
