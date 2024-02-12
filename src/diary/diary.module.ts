import { ImageModule } from './../image/image.module';
import { UserEntity } from './../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { Diary } from '../entity/diary.entity';
import { ImageService } from 'src/image/image.service';
import { S3Service } from 'src/s3/s3.service';
import { Image } from 'src/entity/image.entity';

@Module({
  controllers: [DiaryController],
  providers: [
    DiaryService,
    KalroService,
    PapagoService,
    ImageService,
    S3Service,
  ],
  imports: [TypeOrmModule.forFeature([Diary, UserEntity, Image]), ImageModule],
  exports: [TypeOrmModule], //추가
})
export class DiaryModule {}
