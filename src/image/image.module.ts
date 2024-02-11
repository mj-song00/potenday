import { ImageService } from './image.service';
import { Module } from '@nestjs/common';

import { ImageController } from './image.controller';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
