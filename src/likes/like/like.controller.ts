import { ROLE } from 'src/users/user.enum';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { LikeService } from './like.service';

@Controller('like')
export class likeController {
  constructor(private likeService: LikeService) {}

  @Roles(ROLE.USER)
  @Post('/:diaryId')
  like(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.likeService.getDiaryLike(+diaryId, user);
  }

  //좋아요 많은 순으로 불러오기
  @Roles(ROLE.USER)
  @Get()
  getByLike() {
    return this.likeService.getByLike();
  }
}
