import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Course } from 'src/app/entities/course.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ToBoolean } from 'src/app/shared/transformers/to-boolean.transformer';

export class CreateCourseDiscountDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  @ToBoolean()
  isPercentage: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validFrom: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validUntil: Date;

  @IsNotEmpty()
  @IsUUID()
  course: Course;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
