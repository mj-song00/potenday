import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';
import { Diary } from '../entity/diary.entity';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService, KalroService, PapagoService],
  imports: [TypeOrmModule.forFeature([Diary])],
  exports: [TypeOrmModule], //추가
})
export class DiaryModule {}
