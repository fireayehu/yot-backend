import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateJobLocationDto } from './create-job-location.dto';

export class UpdateJobLocationDto extends PartialType(CreateJobLocationDto) {}

export class UpdateJobLocationParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
