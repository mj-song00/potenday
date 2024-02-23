import { UserEntity } from 'src/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Diary } from './diary.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  diaryId: number;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => Diary, (diary) => diary.likes, { onDelete: 'CASCADE' })
  diary: Diary;
}
