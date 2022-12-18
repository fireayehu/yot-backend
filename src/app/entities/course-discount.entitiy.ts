import { Column, Entity, ManyToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';

@Entity()
export class CourseDiscount extends Abstract {
  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  amount: number;

  @Column()
  isPercentage: boolean;

  @Column({
    type: 'timestamptz',
  })
  validFrom: Date;

  @Column({
    type: 'timestamptz',
  })
  validUntil: Date;

  @ManyToOne(() => Course)
  course: Course;
}
