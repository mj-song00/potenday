import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/entity/diary.entity';
import { Fine } from 'src/entity/emotion.like.entity';
import { Like } from 'src/entity/like.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class EmotionService {
  constructor(
    @InjectRepository(Fine)
    private fineRepository: Repository<Fine>,
  ) {}

  async getFineDiary(diaryId: number, emotion: string, user: UserEntity) {
    const diary = await this.fineRepository.findOne({
      where: { id: diaryId },
    });
    if (!diary) {
      throw new Error('존재하지 않는 다이어리입니다.');
    } else {
      const exist = await this.fineRepository.find({
        where: { user: { id: user.id }, diaryId, emotion },
      });

      if (exist.length === 0) {
        // Insert a new like
        await this.fineRepository.insert({
          user: { id: user.id },
          diaryId,
          emotion,
        });

        return { message: `${emotion}에 공감하였습니다` };
      } else {
        // Delete the existing like
        await this.fineRepository.remove(exist);
        return { message: `${emotion} 공감을 취소하였습니다. ` };
      }
    }
  }
}
