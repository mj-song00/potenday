import { BookMark } from 'src/entity/mark.entity';
import { Diary } from 'src/entity/diary.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Emotion } from './emotion.like.entity';
import { Image } from './image.entity';
import { Like } from './like.entity';
import { Report } from './report.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() //DB 저장 순서
  id: string;

  @Column() //kakao ID
  kakaoId: string;

  @Column({ nullable: true }) // 프로필 이미지
  image: string;

  @Column({ nullable: true }) // nickname (유저 변경가능 )
  nickname: string;

  @Column({ nullable: true }) // 성별
  gender: string;

  @Column({ nullable: true }) // 탄생년
  birth: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Like, (like) => like.user, { onDelete: 'CASCADE' })
  likes: Like[];

  @OneToMany(() => Diary, (diary) => diary.user, { onDelete: 'CASCADE' })
  diary: Diary[];

  @OneToMany(() => Emotion, (emotion) => emotion.user, { onDelete: 'CASCADE' })
  emotion: Emotion[];

  @OneToMany(() => BookMark, (bookmark) => bookmark.user, {
    onDelete: 'CASCADE',
  })
  bookmarks: BookMark[];

  @OneToMany(() => Report, (report) => report.userId)
  report: Report[];
}
