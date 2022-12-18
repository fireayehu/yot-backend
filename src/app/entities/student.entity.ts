import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { User } from './user.entity';

@Entity()
export class Student extends Abstract {
  @Column()
  code: string;

  @OneToOne(() => User, (user) => user.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
