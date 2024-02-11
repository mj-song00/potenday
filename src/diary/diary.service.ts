import { Diary } from './../entity/diary.entity';
import { CreateDiaryDto, UpdateDiaryDto } from './dto/diary.dto';
import { Injectable } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    private readonly kalroService: KalroService,
    private readonly papagoService: PapagoService,
    @InjectRepository(UserEntity)
    private userReposity: Repository<UserEntity>,
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
    const imageName = uuidv4();
    // + path.extname(file.filename); // 파일명에 UUID 추가

    // const uploadFolder = 'uploads';
    // const currentDate = new Date();
    // const year = String(currentDate.getFullYear());
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const imagePath = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   uploadFolder,
    //   year,
    //   month,
    //   day,
    //   imageName,
    // );
    // // 디렉토리가 없으면 생성
    // const imageDir = path.dirname(imagePath);
    // if (!fs.existsSync(imageDir)) {
    //   fs.mkdirSync(imageDir, { recursive: true });
    // }
    // // 파일 저장
    // fs.writeFileSync(imagePath, file.buffer);

    const outputPath = `${__dirname}/../../uploads/${imageName}`;
    const decoded = await this.kalroService.stringToImage(
      createDiaryDto.base64String,
      outputPath,
    );

    console.log(decoded);
    // // 이미지 URL 생성
    // const baseUrl = 'http://localhost:3000'; // 현재 도메인
    // const imageUrl = `${baseUrl}/${uploadFolder}/${year}/${month}/${day}/${imageName}`;
    // const { title, text, date, emotion, weather, isWrite, isPublic } =
    //   createDiaryDto;
    // if (!text) throw new Error('Bad Request');
    // // const imageName = uuidv4() + file.originalname;
    // // const imagePath = `${__dirname}/../../uploads/${imageName}`;
    // // 이미지 경로 반환
    // //  const imageUrl = `http://localhost:3000/image/${imageName}`;
    // const createDiary = await this.diaryRepository.create({
    //   title,
    //   contents: text,
    //   image: imagePath,
    //   date,
    //   emotion,
    //   weather,
    //   isPublic,
    //   isWrite,
    //   user,
    // });
    // // console.log(createDiary);
    // const diary = await this.diaryRepository.save(createDiary);
    // return { result: 'success', imageUrl };
  }

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
