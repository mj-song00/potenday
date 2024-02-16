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

  async getEmotions(diaryId: number) {
    const emotionsData = await this.emotionRepository.find({
      where: { diaryId },
    });

    const emotionCounts = {};

    emotionsData.forEach((emotion) => {
      const { emotion: emotionType } = emotion;
      if (emotionCounts[emotionType]) {
        emotionCounts[emotionType]++;
      } else {
        emotionCounts[emotionType] = 1;
      }
    });

    return emotionCounts;
  }
}
