import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from '../entity/diary.entity';
import { Report } from '../entity/report.entity';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}
  async create(
    createReportDto: CreateReportDto,
    diaryId: number,
    category: string,
    user: UserEntity,
  ) {
    const diary = await this.diaryRepository.findOne({
      where: { id: diaryId },
    });
    if (!diary) throw new Error('존재하지 않는 다이어리입니다.');
    try {
      const { title, details } = createReportDto;

      const report = await this.reportRepository.save({
        title,
        details,
        user: { id: user.id },
        diaryId,
        category,
      });
      return {
        statusCode: HttpStatus.OK,
        data: 'success',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
