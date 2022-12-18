import { Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Tag } from './tag.entity';

@Entity()
export class CourseTag extends Abstract {
  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Tag)
  tag: Tag;
}
