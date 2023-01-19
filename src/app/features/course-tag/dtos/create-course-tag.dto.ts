import { IsNotEmpty, IsUUID } from 'class-validator';
import { Course } from 'src/app/entities/course.entity';
import { Tag } from 'src/app/entities/tag.entity';

export class CreateCourseTagDto {
  @IsNotEmpty()
  @IsUUID()
  course: Course;

  @IsNotEmpty()
  @IsUUID()
  tag: Tag;
}
