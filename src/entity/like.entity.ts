import { UserEntity } from 'src/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToOne((type) => UserEntity, (user) => user.likes)
  user: UserEntity;
}
