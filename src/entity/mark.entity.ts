import { UserEntity } from '../entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Diary } from './diary.entity';

@Entity()
export class BookMark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  diaryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => Diary, (diary) => diary.bookmarks, { onDelete: 'CASCADE' })
  diary: Diary;
}
