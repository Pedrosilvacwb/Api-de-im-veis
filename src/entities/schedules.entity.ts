import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Properties from './properties.entity';
import Users from './users.entity';

@Entity('schedules')
class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('date')
  date: string;
  @Column('time')
  hour: string;
  @ManyToOne(() => Properties, (properties) => properties.schedules)
  property: Properties;
  @ManyToOne(() => Users, (user) => user.schedules)
  user: Users;
}

export default Schedules;
