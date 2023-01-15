import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateJobCategoryDto } from './create-job-category.dto';

export class UpdateJobCategoryDto extends PartialType(CreateJobCategoryDto) {}

export class UpdateJobCategoryParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
