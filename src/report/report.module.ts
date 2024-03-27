import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Report } from 'src/entity/report.entity';
import { Diary } from 'src/entity/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Diary])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
