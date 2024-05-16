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
import { Emotion } from './entity/emotion.like.entity';
import { Like } from './entity/like.entity';
import { ImageModule } from './image/image.module';
import { Image } from './entity/image.entity';
import { ServiceModule } from './service/service.module';
import { LikesModule } from './likes/likes.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { BookMark } from './entity/mark.entity';
import { Report } from './entity/report.entity';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.local.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, Diary, Emotion, Like, Image, BookMark, Report],
      synchronize: true,
    }),
    DiaryModule,
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    ImageModule,
    S3Module,
    ServiceModule,
    LikesModule,
    BookmarkModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InjectAccountMiddleware).forRoutes('*');
  }
}
