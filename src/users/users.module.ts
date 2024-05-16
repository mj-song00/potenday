import { S3Module } from './../s3/s3.module';
import { ImageModule } from './../image/image.module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from '../entity/user.entity';
import { KakaoService } from '../service/kakao/kakao.service';
import { ImageService } from '../image/image.service';
import { Image } from '../entity/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([Image]),
    S3Module,
  ],
  controllers: [UsersController],
  providers: [UsersService, KakaoService, JwtService, ImageService],
})
export class UsersModule {}
