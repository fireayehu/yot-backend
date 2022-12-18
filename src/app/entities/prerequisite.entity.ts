import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';

@Entity()
export class Prerequisite extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => Course)
  course: Course;
}
