import { ROLE } from 'src/users/user.enum';
import { Controller, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { LikeService } from './like.service';

@Controller('like')
export class likeController {
  constructor(private likeService: LikeService) {}

  @Roles(ROLE.USER)
  @Post('/diary/:diaryId/like')
  like(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.likeService.getDiaryLike(+diaryId, user);
  }
}
