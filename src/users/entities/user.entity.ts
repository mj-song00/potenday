import { Diary } from 'src/diary/entity/diary.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() //DB 저장 순서
  id: string;

  @Column() //kakao ID
  kakaoId: string;

  @Column() //kakao nickname
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[];

  @ManyToMany(() => Diary, (diary) => diary.likedByUsers)
  @JoinTable({ name: 'like' }) // 중간 테이블의 이름을 "like"로 지정
  likeDiary: Diary[];
}
