import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Emotion } from './emotion.like.entity';
import { Image } from './image.entity';
import { Like } from './like.entity';
import { BookMark } from './mark.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn() // DB 저장 순서
  id: number;

  @Column() // 제목
  title: string;

  @Column() // prompt 입력 내용
  contents: string;

  @Column() // 일기 날짜
  date: string;

  @Column() //감정
  emotion: string;

  @Column() // 날씨
  weather: string;

  @Column({ type: 'tinyint', default: 0 }) // 일기 작성여부 확인. 기본값 0
  isWrite: boolean;

  @Column({ type: 'tinyint', default: 0 }) // 일기 공개여부 확인 ->0은 나만 보기
  isPublic: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn() // 게시글 생성일
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diary)
  user: UserEntity;

  @OneToMany(() => Like, (like) => like.diary)
  likes: Like[];

  @OneToOne(() => Image)
  @JoinTable()
  image: Image;

  @OneToMany(() => BookMark, (bookmark) => bookmark.diary)
  bookmarks: BookMark[];

  @OneToMany(() => Emotion, (emotions) => emotions.diary)
  emotions: Emotion[];
  좋아요: any;
  슬퍼요: any;
  괜찮아요: any;
  화나요: any;
  기뻐요: any;
}
