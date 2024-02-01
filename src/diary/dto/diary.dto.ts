import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  emotion: string;

  @IsString()
  @IsNotEmpty()
  weather: string;

  isWrite: boolean;
  isPublic: boolean;
}

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {
  // @IsString()
  // @IsNotEmpty()
  // text: string;
  // @IsString()
  // @IsNotEmpty()
  // imageUrl: string;
  // @IsString()
  // @IsNotEmpty()
  // date: string;
  // @IsString()
  // @IsNotEmpty()
  // emotion: string;
  // @IsString()
  // @IsNotEmpty()
  // weather: string;
}
