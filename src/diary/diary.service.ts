import { Diary } from './../entity/diary.entity';
import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    @InjectRepository(UserEntity)
    private userReposity: Repository<UserEntity>,
    private readonly kalroService: KalroService,
    private readonly papagoService: PapagoService,
    private readonly imageService: ImageService,
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
  async createDiary(
    createDiaryDto: CreateDiaryDto,
    user: UserEntity,
    input: Express.Multer.File,
  ) {
    const { title, text, date, emotion, weather, isWrite, isPublic } =
      createDiaryDto;
    if (!text) throw new Error('Bad Request');

    //이미지 생성
    const image = await this.imageService.createImage(input);

    // const createDiary = await this.diaryRepository.create({
    //   title,
    //   contents: text,
    //   date,
    //   emotion,
    //   weather,
    //   isPublic,
    //   isWrite,
    //   user,
    // });
    // console.log(createDiary);
    // const diary = await this.diaryRepository.save(createDiary);
    // return { result: 'success' };
  }

  //url to file

  //개별 다이어리 가져오기
  async findOne(id: number) {
    const diary = await this.diaryRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    return diary;
  }

  // type에 따른 다이어리 가져오기
  async findDiariesByType(
    isPublic: boolean | FindOperator<boolean>,
  ): Promise<Diary[]> {
    if (isPublic) {
      // 모든 사용자의 공개 다이어리를 가져오는 로직
      return await this.diaryRepository.find({
        where: { isPublic: true },
        relations: { user: true },
      });
    } else {
      // 이 부분은 삭제하여 공개 다이어리가 아닌 경우는 가져오지 않도록 한다.
      return [];
    }
  }

  //일기 수정
  async editDiary(id: number, updateDiaryDto: UpdateDiaryDto) {
    const { text, date, emotion, weather, isPublic, isWrite } = updateDiaryDto;
    const updateDiary = await this.diaryRepository.update(id, {
      contents: text,
      //image: imageUrl,
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

  //다이어리만 가져오기
  async findDiaries(user: UserEntity) {
    const diaries = await this.diaryRepository
      .createQueryBuilder('diary')
      .where('diary.userId = :userId', { userId: user.id })
      .getMany();
    return diaries;
  }

  // 좋아요
}
