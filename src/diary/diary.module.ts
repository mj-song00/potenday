import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService, KalroService],
  imports: [],
})
export class DiaryModule {}
