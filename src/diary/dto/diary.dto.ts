import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryDto {
  input: string;
  title: string;
  text: string;
  date: string;
  emotion: string;
  weather: string;
  isWrite: boolean;
  isPublic: boolean;
}

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {}
