import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  details: string;
}
