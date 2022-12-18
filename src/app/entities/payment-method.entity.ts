import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';

@Entity()
export class PaymentMethod extends Abstract {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  logo: string;

  @Column({
    nullable: true,
  })
  accountNumber: string;

  @ManyToOne(() => DataLookup)
  type: DataLookup;
}
