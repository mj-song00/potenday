import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
