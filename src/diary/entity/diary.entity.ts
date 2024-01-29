import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn() // DB 저장 순서
  id: string;

  @Column() // prompt 입력 내용
  contents: string;

  @Column() // image 주소
  image: string;

  @CreateDateColumn() // 일기 생성 날
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  user: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.likeDiary)
  likedByUsers: UserEntity[];
}
