import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 300 })
  name: string;
}

export default Categories;
