import { Column, Entity, Index } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class Resource extends Abstract {
  @Column()
  @Index({ unique: true })
  name: string;
}
