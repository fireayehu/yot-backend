import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { User } from './user.entity';

@Entity()
export class Instructor extends Abstract {
  @Column()
  educationPlace: string;

  @ManyToOne(() => DataLookup)
  educationField: DataLookup;

  @ManyToOne(() => DataLookup)
  educationLevel: DataLookup;

  @Column({
    default: 0,
  })
  totalReview: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  rating: number;

  @OneToOne(() => User, (user) => user.instructor, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
