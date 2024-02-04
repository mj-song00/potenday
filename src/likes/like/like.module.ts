import { DiaryModule } from './../../diary/diary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Like } from 'src/entity/like.entity';
import { likeController } from './like.controller';
import { LikeService } from './like.service';
import { Diary } from 'src/entity/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), DiaryModule],
  controllers: [likeController],
  providers: [LikeService],
})
export class LikeModule {}
