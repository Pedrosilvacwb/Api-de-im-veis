import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
}

export default Users;
