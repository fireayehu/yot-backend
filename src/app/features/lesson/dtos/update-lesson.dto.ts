import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}

export class UpdateLessonParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
