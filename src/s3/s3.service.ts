import {
  S3Client,
  PutObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  CLOUD_FRONT_URL,
  BUCKET_NAME,
  REGION,
} = process.env;

@Injectable()
export class S3Service {
  public region = REGION;
  public bucket = BUCKET_NAME;
  private client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  async upload(
    key: string,
    file: Buffer | ReadStream,
    contentType: string,
  ): Promise<boolean> {
    const input: PutObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
      Body: file,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(input);
    const result: PutObjectCommandOutput = await this.client.send(command);

    return result.$metadata.httpStatusCode === 200;
  }

  private get baseURL() {
    return CLOUD_FRONT_URL;
  }

  public getFileURLByKey(key: string): string {
    return `${this.baseURL}/${key}`;
  }
}
