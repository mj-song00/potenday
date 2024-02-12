
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReadStream } from 'fs';
import { BUCKET_NAME, REGION } from 'src/config/s3.config';
import * as AWS from 'aws-sdk';
@Injectable()
export class S3Service {
  private readonly S3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.S3 = new AWS.S3({
      endpoint: 'https://kr.object.ncloudstorage.com',
      region: 'kr-standard',
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
      },
    });
  }

  public region = REGION;
  public bucket = BUCKET_NAME;

  async upload(
    key: string,
    file: Buffer | ReadStream,
    contentType: string,
  ): Promise<boolean> {

    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read',
      };

      const result: AWS.S3.PutObjectOutput = await this.S3.upload(
        params,
      ).promise();
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  }

  private get baseURL() {
    return this.configService.get<string>('CLOUD_URL');

  }

  public getFileURLByKey(key: string): string {
    return `${this.baseURL}/${key}`;
  }
}
