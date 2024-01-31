import { IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  input: string;
}

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
}
