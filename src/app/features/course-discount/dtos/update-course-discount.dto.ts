import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateCourseDiscountDto } from './create-course-discount.dto';

export class UpdateCourseDiscountDto extends PartialType(
  CreateCourseDiscountDto,
) {}

export class UpdateCourseDiscountParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
