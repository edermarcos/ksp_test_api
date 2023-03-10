import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'text',
  })
  position: string;

  @Column({
    type: 'int',
  })
  salary: number;

  @Column({
    type: 'text',
  })
  status: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt?: Date;
}
