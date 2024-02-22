import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Diary } from './diary.entity';
import { UserEntity } from './user.entity';

//일기 감정
@Entity()
// @TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Emotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  diaryId: number;

  @Column()
  emotion: string;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.emotion)
  user: UserEntity;

  @ManyToOne(() => Diary, (diaries) => diaries.emotion)
  diary: Diary;
}
