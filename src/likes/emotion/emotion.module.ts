import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Emotion } from 'src/entity/emotion.like.entity';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { DiaryModule } from 'src/diary/diary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion]), DiaryModule],
  controllers: [EmotionController],
  providers: [EmotionService],
})
export class EmotionModule {}
