import { Diary } from './../entity/diary.entity';
import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/entity/image.entity';
import axios from 'axios';
import { Emotion } from 'src/entity/emotion.like.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
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
    file: Express.Multer.File,
  ) {
    const { input, title, text, date, emotion, weather, isWrite, isPublic } =
      createDiaryDto;

    if (!text) throw new Error('Bad Request');

    //url to file
    const imageFile = await this.convertURLtoFile(input);

    //이미지 저장
    const imageUrl = await this.imageService.createImage(imageFile);

    const createDiary = await this.diaryRepository.create({
      title,
      contents: text,
      date,
      emotion,
      weather,
      isPublic,
      isWrite,
      user,
      imageUrl: imageUrl.url,
    });

    const diary = await this.diaryRepository.save(createDiary);
    return { result: 'success' };
  }

  //url 파일 변환
  async convertURLtoFile(input: string): Promise<Express.Multer.File> {
    const response = await axios.get(input, { responseType: 'arraybuffer' });
    const data = response.data;

    // URL에서 파일 이름과 확장자 추출
    const urlParts = input.split('/');
    const filenameWithExtension = urlParts[urlParts.length - 1];
    const filenameParts = filenameWithExtension.split('.');
    const filename = filenameParts.slice(0, -1).join('.');
    const ext = filenameParts[filenameParts.length - 1];

    // ArrayBuffer를 Buffer로 변환
    const buffer = Buffer.from(data);
    // 가상의 추가 속성들 생성
    const file: Express.Multer.File = {
      fieldname: 'file', // 필드 이름
      originalname: filename, // 파일의 원래 이름
      encoding: '', // 인코딩
      mimetype: `image/png`, // MIME 타입
      buffer: buffer, // 파일 데이터
      size: buffer.length, // 파일 크기
      stream: null, // 가상의 stream 속성
      destination: null, // 가상의 destination 속성
      filename: null, // 가상의 filename 속성
      path: null, // 가상의 path 속성
    };

    return file;
  }

  //개별 다이어리 가져오기
  async findOne(id: number) {
    const diary = await this.diaryRepository
      .createQueryBuilder('diary') // 다이어리를 기준으로 쿼리를 작성합니다.
      .leftJoinAndSelect('diary.likes', 'like') // 다이어리와 좋아요를 조인합니다.
      .leftJoinAndSelect('diary.emotions', 'emotion') // 다이어리와 감정을 조인합니다.
      .addSelect('COUNT(like.id)', 'likeCount') // 좋아요의 개수를 COUNT하여 likeCount로 선택합니다.
      .addSelect(
        'SUM(CASE WHEN emotion.emotion = "좋아요" THEN 1 ELSE 0 END)',
        '좋아요',
      ) // 감정 중 "좋아요"인 경우 카운트합니다.
      .addSelect(
        'SUM(CASE WHEN emotion.emotion = "슬퍼요" THEN 1 ELSE 0 END)',
        '슬퍼요',
      ) // 감정 중 "슬퍼요"인 경우 카운트합니다.
      .addSelect(
        'SUM(CASE WHEN emotion.emotion = "괜찮아요" THEN 1 ELSE 0 END)',
        '괜찮아요',
      ) // 감정 중 "괜찮아요"인 경우 카운트합니다.
      .addSelect(
        'SUM(CASE WHEN emotion.emotion = "화나요" THEN 1 ELSE 0 END)',
        '화나요',
      ) // 감정 중 "화나요"인 경우 카운트합니다.
      .addSelect(
        'SUM(CASE WHEN emotion.emotion = "기뻐요" THEN 1 ELSE 0 END)',
        '기뻐요',
      ) // 감정 중 "슬퍼요"인 경우 카운트합니다.
      .where('diary.id = :id', { id }) // 지정된 id에 해당하는 다이어리만 선택합니다.
      .groupBy('diary.id') // 다이어리 id로 그룹화합니다.
      .orderBy('likeCount', 'DESC') // 좋아요 갯수를 기준으로 내림차순으로 정렬합니다.
      .getRawOne(); // 결과를 하나만 가져옵니다.

    if (!diary) {
      throw new Error('해당 id에 해당하는 다이어리를 찾을 수 없습니다.');
    }

    return diary;
  }

  // type에 따른 다이어리 가져오기
  async findDiariesByType(
    isPublic: boolean | FindOperator<boolean>,
  ): Promise<{ diary: Diary; likeCount: number; emotions: Emotion[] }[]> {
    let diaries: Diary[];
    let diariesWithLikeAndEmotions: {
      diary: Diary;
      likeCount: number;
      emotions: Emotion[];
    }[] = [];

    if (typeof isPublic === 'boolean') {
      if (isPublic) {
        diaries = await this.diaryRepository.find({
          where: { isPublic: true },
          relations: ['likes', 'emotions'],
          order: { createdAt: 'DESC', id: 'DESC' },
        });
      } else {
        return [];
      }
    } else {
      diaries = await this.diaryRepository.find({
        where: { isPublic },
        relations: ['likes', 'emotions'],
        order: { createdAt: 'DESC', id: 'DESC' },
      });
    }

    for (const diary of diaries) {
      const likeCount = diary.likes.length;
      const emotions = diary.emotions; // 다이어리의 감정들을 가져옵니다.
      diariesWithLikeAndEmotions.push({ diary, likeCount, emotions });
    }

    return diariesWithLikeAndEmotions;
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
      .leftJoinAndSelect('diary.likes', 'like') // 좋아요를 조인합니다.
      .where('diary.userId = :userId', { userId: user.id })
      .getMany();
    const diariesWithLikeCount = diaries.map((diary) => ({
      diary: diary,
      likeCount: diary.likes.length,
    }));
    return diariesWithLikeCount;
  }
}
