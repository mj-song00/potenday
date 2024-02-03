import { Diary } from 'src/entity/diary.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './like.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() //DB 저장 순서
  id: string;

  @Column() //kakao ID
  kakaoId: string;

  @Column() //kakao nickname
  nickname: string;

  @Column() // 성별
  gender: string;

  @Column() // 탄생년
  birth: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[];
}
