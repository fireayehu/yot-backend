import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class Tag extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}
