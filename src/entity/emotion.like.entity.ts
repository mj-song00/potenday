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
export class Fine extends BaseEntity {
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

@ChildEntity()
export class EmontionLike extends Fine {}

@ChildEntity()
export class Sad extends Fine {}

@ChildEntity()
export class Happy extends Fine {}

@ChildEntity()
export class Angry extends Fine {}
