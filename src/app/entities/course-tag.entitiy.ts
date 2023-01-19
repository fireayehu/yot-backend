import { Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Tag } from './tag.entity';

@Entity()
@Index(['course', 'tag'], { unique: true })
export class CourseTag extends Abstract {
  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Tag)
  tag: Tag;
}
