import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class JobCategory extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}
