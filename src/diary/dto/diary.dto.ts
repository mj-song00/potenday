import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  input: string;
  title: string;
  text: string;
  date: string;
  emotion: string;
  weather: string;

  @IsBoolean()
  isWrite: boolean;
  isPublic: boolean;
}

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {}
