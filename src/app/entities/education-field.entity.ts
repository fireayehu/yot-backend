import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class EducationField extends Abstract {
  @Column()
  name: string;
}
