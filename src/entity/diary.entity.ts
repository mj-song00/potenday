import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn() // DB 저장 순서
  id: number;

  @Column()
  title: string;

  @Column() // prompt 입력 내용
  contents: string;

  @Column() // image 주소
  image: string;

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

  @CreateDateColumn() // 게시글 생성일
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  user: UserEntity;
}
