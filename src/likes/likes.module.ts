import { EmotionModule } from './emotion/emotion.module';
import { Module } from '@nestjs/common';
import { LikeModule } from './like/like.module';

@Module({
  imports: [EmotionModule, LikeModule],
})
export class LikesModule {}
