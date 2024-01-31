import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { KalroService } from 'src/service/kalro/karlo.service';
import { PapagoService } from 'src/service/papgo/papago.service';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService, KalroService, PapagoService],
  imports: [],
})
export class DiaryModule {}
