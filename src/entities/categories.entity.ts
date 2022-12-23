import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Properties from './properties.entity';

@Entity('categories')
class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 300 })
  name: string;
  @OneToMany(() => Properties, (properties) => properties.category)
  properties: Properties[];
}

export default Categories;
