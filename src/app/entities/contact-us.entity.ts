import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { SubService } from './sub-service.entity';

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

  @ManyToOne(() => SubService)
  subService: SubService;
}
