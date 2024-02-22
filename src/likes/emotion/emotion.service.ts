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

  async checkEmotions(diaryId: number, user: UserEntity) {
    const emotions = await this.emotionRepository
      .createQueryBuilder('emotion')
      .where('emotion.userId = :userId', { userId: user.id })
      .andWhere('emotion.diaryId = :diaryId', { diaryId: diaryId })
      .getMany();

    // 감정을 나타내는 속성과 해당하는 boolean 값을 설정하기 위한 객체를 정의합니다.
    const emotionsData: { [key: string]: boolean } = {
      좋아요: false,
      괜찮아요: false,
      슬퍼요: false,
      화나요: false,
      기뻐요: false,
    };

    // 주어진 데이터의 감정 값을 설정합니다.
    emotions.forEach((emotion) => {
      emotionsData[emotion.emotion] = true;
    });

    return emotionsData;
  }
}
