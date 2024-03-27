import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/entity/diary.entity';
import { BookMark } from 'src/entity/mark.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
    @InjectRepository(BookMark)
    private bookmarkRepository: Repository<BookMark>,
  ) {}

  //북마크 추가
  async save(diaryId: number, user: UserEntity) {
    const diary = await this.diaryRepository.findOne({
      where: { id: diaryId },
    });

    if (!diary) {
      throw new Error('존재하지 않는 다이어리입니다.');
    } else {
      const exist = await this.bookmarkRepository.find({
        where: { user: { id: user.id }, diaryId },
      });

      if (exist.length === 0) {
        // Insert a new bookmark
        await this.bookmarkRepository.insert({
          user: { id: user.id },
          diaryId,
        });

        return { message: '북마크가 추가되었습니다.' };
      } else {
        // Delete the existing bookmark
        await this.bookmarkRepository.remove(exist);
        return { message: '북마크가 취소되었습니다.' };
      }
    }
  }

  //북마크 불러오기
  async findAllBookmark(user: UserEntity) {
    const bookmarks = await this.bookmarkRepository.find({
      where: { user: { id: user.id } },
      relations: { diary: true },
    });
    return bookmarks;
  }

  //북마크 여부 확인
  async check(diaryId: number, user: UserEntity) {
    const isChecked = await this.bookmarkRepository.find({
      where: { user: { id: user.id }, diaryId },
    });
    return isChecked.length !== 0;
  }
}
