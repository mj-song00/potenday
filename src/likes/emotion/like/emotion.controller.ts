import { ROLE } from 'src/users/user.enum';
import { Controller, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { EmotionService } from './emotion.service';

@Controller('emotion')
export class likeController {
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
}
