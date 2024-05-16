import { UserEntity } from './../entity/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Roles } from '../decorators/roles.decorator';
import { ROLE } from '../users/user.enum';
import { User } from '../decorators/user.decorators';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('/:diaryId')
  @Roles(ROLE.USER)
  create(
    @Body() createReportDto: CreateReportDto,
    @Param('diaryId') diaryId: string,
    @Query('category') category: string,
    @User() user: UserEntity,
  ) {
    return this.reportService.create(createReportDto, +diaryId, category, user);
  }
}
