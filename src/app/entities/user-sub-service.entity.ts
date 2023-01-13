import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { SubService } from './sub-service.entity';
import { User } from './user.entity';

@Entity()
export class UserSubService extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => SubService)
  service: SubService;
}
