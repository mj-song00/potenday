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
    const diary = await this.diaryReposity.findOne({
      where: { id: diaryId },
    });

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

  //좋아요 많은 순으로 불러오기
  async getByLike() {
    const diarise = await this.diaryLikeRepository
      .createQueryBuilder('like')
      .innerJoin(Diary, 'diary', 'diary.id = like.diaryId')
      .select('like.diaryId AS diaryId')
      .addSelect('diary.*') // Select all columns from diary
      .addSelect('COUNT(*) AS likeCount')
      .groupBy('like.diaryId')
      .orderBy('likeCount', 'DESC')
      .getRawMany();
    return diarise;
  }

  async checkLike(diaryId: number, user: UserEntity) {
    const isLike = await this.diaryLikeRepository
      .createQueryBuilder('like') // 좋아요 엔터티를 기준으로 쿼리를 작성합니다.
      .where('like.userId = :userId', { userId: user.id }) // 지정된 userId가 있는지 확인합니다.
      .andWhere('like.diaryId = :diaryId', { diaryId: diaryId }) // 지정된 diaryId가 있는지 확인합니다.
      .getCount(); // 결과의 개수를 가져옵니다.

    return !isLike ? 'true' : 'false';
  }
}
