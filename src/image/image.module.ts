import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [HttpModule], // HttpModule 대신 @nestjs/axios의 HttpModule을 import
})
export class ImageModule {}
