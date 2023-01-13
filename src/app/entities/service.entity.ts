import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';

@Entity()
export class Service extends Abstract {
  @Column()
  @Index({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(() => DataLookup)
  type: DataLookup;
}
