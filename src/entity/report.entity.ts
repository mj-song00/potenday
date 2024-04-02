import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diary } from './diary.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  details: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  category: string;

  @Column()
  userId: number;

  @Column()
  diaryId: number;

  @ManyToOne(() => UserEntity, (user) => user.report)
  user: UserEntity;

  @ManyToOne(() => Diary, (diary) => diary.report)
  diary: Diary;
}
