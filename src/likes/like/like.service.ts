import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/entity/diary.entity';
import { Like } from 'src/entity/like.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class LikeService {
  constructor(
    @InjectRepository(Like) private diaryLikeRepository: Repository<Like>,
    @InjectRepository(Diary) private diaryReposity: Repository<Diary>,
  ) {}

  async getDiaryLike(diaryId: number, user: UserEntity) {
    const diary = await this.diaryReposity.findOne({ where: { id: diaryId } });
    if (!diary) {
      throw new Error('존재하지 않는 다이어리입니다.');
    } else {
      const exist = await this.diaryLikeRepository.find({
        where: { user: { id: user.id }, diaryId },
      });

      if (exist.length === 0) {
        // Insert a new like
        await this.diaryLikeRepository.insert({
          user: { id: user.id },
          diaryId,
        });

        return { message: '좋아요가 추가되었습니다.' };
      } else {
        // Delete the existing like
        await this.diaryLikeRepository.remove(exist);
        return { message: '좋아요가 취소되었습니다.' };
      }
    }
  }
}
