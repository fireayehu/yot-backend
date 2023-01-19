import { IsNotEmpty, IsUUID } from 'class-validator';
import { Course } from 'src/app/entities/course.entity';
import { Language } from 'src/app/entities/language.entity';

export class CreateCourseLanguageDto {
  @IsNotEmpty()
  @IsUUID()
  course: Course;

  @IsNotEmpty()
  @IsUUID()
  language: Language;
}
