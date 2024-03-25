import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;
  details: string;
}
