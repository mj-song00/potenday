import { Diary } from 'src/entity/diary.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Emotion } from './emotion.like.entity';
import { Like } from './like.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() //DB 저장 순서
  id: string;

  @Column() //kakao ID
  kakaoId: string;

  @Column() //kakao nickname
  nickname: string;

  @Column({ nullable: true }) // 성별
  gender: string;

  @Column({ nullable: true }) // 탄생년
  birth: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[];

  @OneToMany(() => Emotion, (emotion) => emotion.user)
  emotion: Emotion[];
}
