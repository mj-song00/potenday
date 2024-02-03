import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entity/diary.entity';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    private readonly kalroService: KalroService,
    private readonly papagoService: PapagoService,
  ) {}

  //파파고 번역
  async papagoTranslation(input: string) {
    if (!input) throw new Error('Bad Request');

    const text = await this.papagoService.translation(input);
    return text;
  }

  //이미지 생성
  async createImage(context: string, negativePrompt: string) {
    if (!context) throw new Error('Bad Request');

    const image = await this.kalroService.createImage(context, negativePrompt);
    return image;
  }

  // 이미지, 번역문, 기분, 날짜, 날씨 저장
  async createDiary(createDiaryDto: CreateDiaryDto, user: UserEntity) {
    const { title, text, imageUrl, date, emotion, weather, isWrite, isPublic } =
      createDiaryDto;
    if (!text || !imageUrl) throw new Error('Bad Request');

    const createDiary = this.diaryRepository.create({
      title,
      contents: text,
      image: imageUrl,
      date,
      emotion,
      weather,
      isPublic,
      isWrite,
      user,
    });

    const diary = await this.diaryRepository.save(createDiary);
    return { result: 'success' };
  }

  //개별 다이어리 가져오기
  async findOne(id: number) {
    const diary = await this.diaryRepository.findOne({ where: { id } });
    return diary;
  }

  // type에 따른 다이어리 가져오기
  async findDiariesByType(
    isPublic: boolean | FindOperator<boolean>,
  ): Promise<Diary[]> {
    if (isPublic) {
      // 모든 사용자의 공개 다이어리를 가져오는 로직
      return await this.diaryRepository.find({ where: { isPublic: true } });
    } else {
      // 이 부분은 삭제하여 공개 다이어리가 아닌 경우는 가져오지 않도록 합니다.
      return [];
    }
  }

  //일기 수정
  async editDiary(id: number, updateDiaryDto: UpdateDiaryDto) {
    const { text, imageUrl, date, emotion, weather, isPublic, isWrite } =
      updateDiaryDto;
    const updateDiary = await this.diaryRepository.update(id, {
      contents: text,
      image: imageUrl,
      date,
      emotion,
      weather,
      isWrite,
      isPublic,
    });
    return { result: 'sucess' };
  }

  //일기 삭제

  async deleteDiary(id: number) {
    const diary = await this.diaryRepository.delete(id);
    return { result: 'diary delete success' };
  }
}
