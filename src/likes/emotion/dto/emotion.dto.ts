import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  emotion: string;
}
export class EmotionCounts {
  @IsNumber()
  좋아요: number;
  슬퍼요: number;
  괜찮아요: number;
  화나요: number;
  기뻐요: number;
}
