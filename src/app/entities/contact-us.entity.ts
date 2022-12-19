import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Service } from './service.entity';

@Entity()
export class ContactUs extends Abstract {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column()
  message: string;

  @ManyToOne(() => Service)
  service: Service;
}
