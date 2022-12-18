import { Column, Entity } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class BlogCategory extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}
