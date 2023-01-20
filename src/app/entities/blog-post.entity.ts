import { Column, Entity, ManyToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { BlogCategory } from './blog-category.entity';
import { DataLookup } from './data-lookup.entity';
import { User } from './user.entity';

@Entity()
export class BlogPost extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column('jsonb', { nullable: false, default: {} })
  content: object;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    type: 'decimal',
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  duration: number;

  @ManyToOne(() => DataLookup)
  durationUnit: DataLookup;

  @ManyToOne(() => BlogCategory)
  category: BlogCategory;

  @ManyToOne(() => User)
  author: User;
}
