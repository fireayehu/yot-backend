import { Column, Entity, ManyToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { Section } from './section.entity';

@Entity()
export class Lesson extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  order: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  duration: number;

  @ManyToOne(() => DataLookup)
  durationUnit: DataLookup;

  @ManyToOne(() => Section)
  section: Section;
}
