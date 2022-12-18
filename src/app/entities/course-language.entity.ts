import { Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Language } from './language.entity';

@Entity()
export class CourseLanguage extends Abstract {
  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Language)
  language: Language;
}
