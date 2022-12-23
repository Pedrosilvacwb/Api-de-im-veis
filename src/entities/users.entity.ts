import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import Schedules from './schedules.entity';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 300 })
  name: string;
  @Column('varchar', { length: 300, unique: true })
  email: string;
  @Column('varchar', { length: 300 })
  password: string;
  @Column()
  isAdm: boolean;
  @Column('boolean', { default: true })
  isActive: boolean = true;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @OneToMany(() => Schedules, (schedules) => schedules.user)
  schedules: Schedules[];
}

export default Users;
