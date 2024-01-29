import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService],
  imports: [HttpModule],
})
export class DiaryModule {}
