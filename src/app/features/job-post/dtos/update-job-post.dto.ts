import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateJobPostDto } from './create-job-post.dto';

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {}

export class UpdateJobPostParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
