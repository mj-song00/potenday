import { CreateEmotionDto } from './dto/emotion.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emotion } from 'src/entity/emotion.like.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Diary } from 'src/entity/diary.entity';

Injectable();
export class EmotionService {
  constructor(
    @InjectRepository(Emotion)
    private emotionRepository: Repository<Emotion>,
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
  ) {}

  async getFineDiary(
    diaryId: number,
    createEmotionDto: CreateEmotionDto,
    user: UserEntity,
  ) {
    const { emotion } = createEmotionDto;
    const diary = await this.diaryRepository.findOne({
      where: { id: diaryId },
    });
    if (!diary) {
      throw new Error('존재하지 않는 다이어리입니다.');
    } else {
      const existingEmotion = await this.emotionRepository.findOne({
        where: { user: { id: user.id }, diaryId, emotion },
      });

      if (!existingEmotion) {
        // Insert a new emotion
        await this.emotionRepository.insert({
          user: { id: user.id },
          diaryId,
          emotion,
        });
        return {
          message: `${diaryId}번 diary에 '${emotion}'를(을) 느꼈습니다`,
        };
      } else {
        // Delete the existing emotion
        await this.emotionRepository.remove(existingEmotion);
        return {
          message: `${diaryId}번 diary에 공감한 '${emotion}'를(을) 취소하였습니다. `,
        };
      }
    }
  }

  async chekcEmotions(diaryId: number, user: UserEntity) {
    const emotions = await this.emotionRepository
      .createQueryBuilder('emotion')
      .where('emotion.userId = :userId', { userId: user.id }) // 사용자 ID와 일치하는 감정을 가져오도록 수정
      .andWhere('emotion.diaryId = :diaryId', { diaryId: diaryId }) // 다이어리 ID와 일치하는 감정을 가져오도록 수정
      .getMany(); // 결과를 배열로 가져옵니다.

    return emotions;
  }
}
