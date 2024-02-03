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
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne((type) => UserEntity, (user) => user.likes)
  user: UserEntity;
}

@ChildEntity()
export class Fine extends Like {}

@ChildEntity()
export class Sad extends Like {}

@ChildEntity()
export class Happy extends Like {}

@ChildEntity()
export class Angry extends Like {}
