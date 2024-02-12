import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { ImageService } from './image.service';
import { Module } from '@nestjs/common';
import { Image } from 'src/entity/image.entity';

@Module({
  controllers: [],
  providers: [ImageService, S3Service],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImageModule {}
