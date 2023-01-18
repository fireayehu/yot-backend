import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateJobApplicationDto } from './create-job-application.dto';

export class UpdateJobApplicationDto extends PartialType(
  CreateJobApplicationDto,
) {}

export class UpdateJobApplicationParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
