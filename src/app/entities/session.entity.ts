import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';

@Entity()
export class Session extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
  })
  endDate: Date;

  @Column({
    default: 0,
  })
  totalStudent: number;

  @ManyToOne(() => Course)
  course: Course;
}
