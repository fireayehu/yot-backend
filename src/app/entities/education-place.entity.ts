import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class EducationPlace extends Abstract {
  @Column()
  name: string;
}
