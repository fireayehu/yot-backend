import { Column, Entity, ManyToOne } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { Enrolment } from './enrolment.entity';
import { PaymentMethod } from './payment-method.entity';
import { User } from './user.entity';

@Entity()
export class Payment extends Abstract {
  @Column({
    type: 'decimal',
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  amount: number;

  @Column({
    nullable: true,
  })
  transactionNumber: string;

  @ManyToOne(() => Enrolment)
  enrolment: Enrolment;

  @ManyToOne(() => User)
  payer: User;

  @ManyToOne(() => PaymentMethod)
  method: PaymentMethod;

  @ManyToOne(() => DataLookup)
  status: DataLookup;
}
