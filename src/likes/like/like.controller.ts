import { ROLE } from 'src/users/user.enum';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { LikeService } from './like.service';

@Controller('like')
export class likeController {
  constructor(private likeService: LikeService) {}

  @Post('/:diaryId')
  @Roles(ROLE.USER)
  like(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.likeService.getDiaryLike(+diaryId, user);
  }

  //좋아요 많은 순으로 불러오기
  @Get('')
  @Roles(ROLE.USER)
  getByLike() {
    return this.likeService.getByLike();
  }

  //좋아요 여부 확인
  @Get('/:diaryId')
  @Roles(ROLE.USER)
  checkLike(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.likeService.checkLike(+diaryId, user);
  }
}
