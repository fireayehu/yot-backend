import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class EducationLevel extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  shortCode: string;
}
