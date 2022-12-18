import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class Language extends Abstract {
  @Column()
  name: string;
}
