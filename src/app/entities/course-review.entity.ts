import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity()
@Index(['user', 'course'], { unique: true })
export class CourseReview extends Abstract {
  @Column({
    nullable: true,
  })
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  user: User;
}
