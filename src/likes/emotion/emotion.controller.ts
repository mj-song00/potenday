import { ROLE } from '../../users/user.enum';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorators';
import { UserEntity } from '../../entity/user.entity';
import { EmotionService } from './emotion.service';
import { CreateEmotionDto } from './dto/emotion.dto';

@Controller('emotion')
export class EmotionController {
  constructor(private emotionService: EmotionService) {}

  //다이어리 감정에 공감하기
  @Roles(ROLE.USER)
  @Post('/:diaryId')
  fineEmotion(
    @Body() createEmotionDto: CreateEmotionDto,
    @Param('diaryId') diaryId: string,
    @User() user: UserEntity,
  ) {
    return this.emotionService.getFineDiary(+diaryId, createEmotionDto, user);
  }

  //다이어리 감정 확인하기
  @Roles(ROLE.USER)
  @Get('/:diaryId')
  chekEmotions(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.emotionService.checkEmotions(+diaryId, user);
  }
}
