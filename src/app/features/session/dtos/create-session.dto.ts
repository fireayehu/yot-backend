import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Course } from 'src/app/entities/course.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { User } from 'src/app/entities/user.entity';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsNotEmpty()
  @IsUUID()
  course: Course;

  @IsNotEmpty()
  @IsUUID()
  instructor: User;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
