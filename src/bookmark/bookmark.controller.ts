import { ROLE } from './../users/user.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  //북마크 추가
  @Post('/:diaryId')
  @Roles(ROLE.USER)
  create(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.bookmarkService.save(+diaryId, user);
  }

  //북마크 불러오기
  @Get('')
  @Roles(ROLE.USER)
  findBookmark(@User() user: UserEntity) {
    return this.bookmarkService.findAllBookmark(user);
  }
  //북마크 여부 확인
  @Get('/:diaryId')
  @Roles(ROLE.USER)
  check(@Param('diaryId') diaryId: string, @User() user: UserEntity) {
    return this.bookmarkService.check(+diaryId, user);
  }
}
