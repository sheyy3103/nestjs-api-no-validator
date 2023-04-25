/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ length: 150 })
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
