import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { Image } from 'src/entity/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ImageService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File) {
    console.log(file.originalname);
    const fileName = uuidv4();
    const ext = file.originalname.split('.')[0];
    const key = `${fileName}.${ext}`;
    const url = this.s3Service.getFileURLByKey(key);

    const isSuccess = await this.s3Service.upload(
      key,
      file.buffer,
      file.mimetype,
    );
    if (!isSuccess) throw new Error('IMAGE_UPLOAD_FAILED');

    const image = await this.imageRepository.create({
      key,
      url,
    });

    return image;
  }
}
