import { ImageModule } from './../image/image.module';
import { UserEntity } from './../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { KalroService } from '../service/kalro/karlo.service';
import { PapagoService } from '../service/papgo/papago.service';
import { Diary } from '../entity/diary.entity';
import { ImageService } from '../image/image.service';
import { S3Service } from '../s3/s3.service';
import { Emotion } from '../entity/emotion.like.entity';
import { Image } from '../entity/image.entity';

@Module({
  controllers: [DiaryController],
  providers: [
    DiaryService,
    KalroService,
    PapagoService,
    ImageService,
    S3Service,
  ],
  imports: [
    TypeOrmModule.forFeature([Diary, UserEntity, Emotion, Image]),
    ImageModule,
  ],
  exports: [TypeOrmModule], //추가
})
export class DiaryModule {}
