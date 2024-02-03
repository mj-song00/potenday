import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryDto {
  title: string;
  text: string;
  imageUrl: string;
  date: string;
  emotion: string;
  weather: string;
  isWrite: boolean;
  isPublic: boolean;
}

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {}
