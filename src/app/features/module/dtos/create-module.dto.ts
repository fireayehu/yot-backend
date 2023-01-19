import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Course } from 'src/app/entities/course.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  course: Course;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
