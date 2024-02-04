import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Emotion } from 'src/entity/emotion.like.entity';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  controllers: [EmotionController],
  providers: [EmotionService],
})
export class EmotionModule {}
