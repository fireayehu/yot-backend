import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { EducationField } from './education-field.entity';
import { EducationLevel } from './education-level.entity';
import { User } from './user.entity';

@Entity()
export class Instructor extends Abstract {
  @Column()
  educationPlace: string;

  @ManyToOne(() => EducationField)
  educationField: EducationField;

  @ManyToOne(() => EducationLevel)
  educationLevel: EducationLevel;

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
