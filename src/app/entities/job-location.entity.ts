import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class JobLocation extends Abstract {
  @Column()
  name: string;
}
