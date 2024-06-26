import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { DiaryModule } from '../diary/diary.module';
import { BookMark } from '../entity/mark.entity';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
  imports: [DiaryModule, TypeOrmModule.forFeature([BookMark])],
})
export class BookmarkModule {}
