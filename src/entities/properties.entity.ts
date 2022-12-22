import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import Addresses from './addresses.entity';
import Categories from './categories.entity';

@Entity('properties')
class Properties {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: false })
  sold: boolean = false;
  @Column()
  value: number;
  @Column()
  size: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => Addresses, (address) => address.property)
  @JoinColumn()
  address: Addresses;
  @ManyToOne(() => Categories, (categories) => categories.properties)
  category: Categories;
}

export default Properties;
