import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @CreateDateColumn()
  createdAt?: Date;
}
