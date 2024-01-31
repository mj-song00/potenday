import { CreateDiaryDto } from './dto/image.dto';
import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entity/diary.entity';
import { Repository } from 'typeorm';

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
  async createImage(input: string, negativePrompt: string) {
    if (!input) throw new Error('Bad Request');

    const image = await this.kalroService.createImage(input, negativePrompt);
    return image;
  }

  // 이미지, 번역문, 기분, 날짜, 날씨 저장
  async createDiary(createDiaryDto: CreateDiaryDto) {
    const { text, imageUrl, date, emotion, weather } = createDiaryDto;
    if (!text || !imageUrl) throw new Error('Bad Request');

    const createDiary = this.diaryRepository.create({
      contents: text,
      image: imageUrl,
      date,
      emotion,
      weather,
    });

    const diary = await this.diaryRepository.save(createDiary);
    return { result: 'success' };
  }

  //다이어리 가져오기
  async findOne(id: number) {
    const diary = await this.diaryRepository.findOne({ where: { id } });
    return diary;
  }
}
