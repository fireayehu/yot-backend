import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { User } from './user.entity';

@Entity()
@Index(['user', 'instructor'], { unique: true })
export class InstructorReview extends Abstract {
  @Column({
    nullable: true,
  })
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => User)
  instructor: User;

  @ManyToOne(() => User)
  user: User;
}
