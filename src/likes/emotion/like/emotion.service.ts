import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emotion } from 'src/entity/emotion.like.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class EmotionService {
  constructor(
    @InjectRepository(Emotion)
    private emotionRepository: Repository<Emotion>,
  ) {}

  async getFineDiary(diaryId: number, emotion: string, user: UserEntity) {
    const diary = await this.emotionRepository.findOne({
      where: { id: diaryId },
    });
    if (!diary) {
      throw new HttpException(
        '존재하지 않는 다이어리입니다.',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const exist = await this.emotionRepository.find({
        where: { user: { id: user.id }, diaryId, emotion },
      });

      if (exist.length === 0) {
        // Insert a new like
        await this.emotionRepository.insert({
          user: { id: user.id },
          diaryId,
          emotion,
        });

        return { message: `${emotion}에 공감하였습니다` };
      } else {
        // Delete the existing like
        await this.emotionRepository.remove(exist);
        return { message: `${emotion} 공감을 취소하였습니다. ` };
      }
    }
  }

  // 다이어리 감정 불러오기
  // async getEmotion(diaryId: number, emotion: string) {
  //   const emotionData = this.emotionRepository.find({
  //     where: { id: diaryId, emotion },
  //   });
  //   if (!emotionData) {
  //     throw new HttpException(
  //       '해당 다이어리와 감정에 대한 데이터가 없습니다.',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   return emotionData;
  // }

  async getEmotions(diaryId: number) {
    const emotionsData = await this.emotionRepository.find({
      where: { diaryId },
    });

    if (emotionsData.length === 0) {
      throw new HttpException(
        '해당 다이어리와 감정에 대한 데이터가 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return emotionsData;
  }

  async getMyLikesByDiary(diaryId: number, user: UserEntity) {
    const likes = await this.emotionRepository.find({
      where: {
        diaryId: diaryId,
        user: { id: user.id },
      },
    });

    if (likes.length > 0) {
      // 사용자가 다이어리에 공감했다면, 공감 데이터 반환
      return { liked: true, likes: likes };
    } else {
      // 사용자가 다이어리에 공감하지 않았다면, 공감하지 않았음을 나타내는 응답 반환
      return { liked: false };
    }
  }
}
