import { S3Module } from './s3/s3.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiaryModule } from './diary/diary.module';
import { Diary } from './entity/diary.entity';
import { UserEntity } from './entity/user.entity';
import { UsersModule } from './users/users.module';
import { InjectAccountMiddleware } from './middlewares/InjectAccount.middleware';
import { EmotionModule } from './likes/emotion/like/emotion.module';
import { LikeModule } from './likes/like/like.module';
import { Emotion } from './entity/emotion.like.entity';
import { Like } from './entity/like.entity';
import { ImageModule } from './image/image.module';
import { Image } from './entity/image.entity';
import { ServiceModule } from './service/service.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.local.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, Diary, Emotion, Like, Image],
      synchronize: true,
    }),
    DiaryModule,
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    EmotionModule,
    LikeModule,
    ImageModule,
    S3Module,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InjectAccountMiddleware).forRoutes('*');
  }
}
