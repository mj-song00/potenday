import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  emotion: string;
}
export class EmotionCounts {
  @IsNumber()
  좋아요: number;

  @IsNumber()
  슬퍼요: number;

  @IsNumber()
  괜찮아요: number;

  @IsNumber()
  화나요: number;

  @IsNumber()
  기뻐요: number;
}
