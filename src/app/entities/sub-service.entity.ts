import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Service } from './service.entity';

@Entity()
export class SubService extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(() => Service)
  service: Service;
}
