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
import { UserEntity } from './user.entity';

//일기 감정
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Emotion extends BaseEntity {
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

  @ManyToOne((type) => UserEntity, (user) => user.likes)
  user: UserEntity;
}
