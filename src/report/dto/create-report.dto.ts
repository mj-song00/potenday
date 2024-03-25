import { IsString } from 'class-validator';

export class CreateReportDto {
  title: string;

  details: string;
}
