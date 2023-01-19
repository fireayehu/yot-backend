import { Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Language } from './language.entity';

@Entity()
@Index(['course', 'language'], { unique: true })
export class CourseLanguage extends Abstract {
  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Language)
  language: Language;
}
