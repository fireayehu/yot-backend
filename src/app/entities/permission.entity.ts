import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Resource } from './resource.entity';

@Entity()
export class Permission extends Abstract {
  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  code: string;

  @ManyToOne(() => Resource)
  resource: Resource;
}
