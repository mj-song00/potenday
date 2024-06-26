import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entity/image.entity';
import { S3Service } from '../s3/s3.service';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private readonly s3Service: S3Service,
  ) {}

  async createImage(imageFile: Express.Multer.File) {
    if (!imageFile || !imageFile.mimetype.startsWith('image/')) {
      throw new HttpException(
        'Provided file is not an image',
        HttpStatus.BAD_REQUEST,
      );
    }
    const fileName = uuidv4();
    const ext = 'png';
    const key = `${fileName}.${ext}`;
    const url = this.s3Service.getFileURLByKey(key);
    const isSuccess = await this.s3Service.upload(
      key,
      imageFile.buffer,
      imageFile.mimetype,
    );
    if (!isSuccess) throw new Error('IMAGE_UPLOAD_FAILED');
    const createImage = await this.imageRepository.save({
      key,
      url,
    });
    return createImage;
  }
}
