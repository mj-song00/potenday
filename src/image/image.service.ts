import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entity/image.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ImageService {
  constructor() {}

  async createImage(input: Express.Multer.File) {
    const fileName = uuidv4();
    const ext = input.originalname.split('.')[0];
    console.log(fileName, ext);
    // const key = `${fileName}.${ext}`;
    // const url = this.s3Service.getFileURLByKey(key);

    // const isSuccess = await this.s3Service.upload(
    //   key,
    //   input.buffer,
    //   input.mimetype,
    // );
    // if (!isSuccess) throw new Error('IMAGE_UPLOAD_FAILED');

    // const image = await this.imageService.create({
    //   data: { key, url },
    // });

    // return image;
  }
}
