import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Properties from './properties.entity';

@Entity('addresses')
class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  district: string;
  @Column()
  zipCode: string;
  @Column()
  number: string;
  @Column()
  city: string;
  @Column()
  state: string;

  @OneToOne(() => Properties, (property) => property.address)
  property: Properties;
}

export default Addresses;
