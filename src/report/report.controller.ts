import { UserEntity } from './../entity/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/users/user.enum';
import { User } from 'src/decorators/user.decorators';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('/:diaryId')
  @Roles(ROLE.USER)
  create(
    @Body() createReportDto: CreateReportDto,
    @Param('diaryId') diaryId: string,
    @User() user: UserEntity,
  ) {
    return this.reportService.create(createReportDto, +diaryId, user);
  }
}
