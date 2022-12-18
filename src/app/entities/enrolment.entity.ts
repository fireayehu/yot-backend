import { Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Payment } from './payment.entity';
import { Session } from './session.entity';
import { User } from './user.entity';

@Entity()
@Index(['user', 'session'], { unique: true })
export class Enrolment extends Abstract {
  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Session)
  session: Session;

  @OneToMany(() => Payment, (payment) => payment.enrolment)
  payment: Payment;
}
