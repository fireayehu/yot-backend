import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEducationLevelDto } from './create-education-level.dto';

export class UpdateEducationLevelDto extends PartialType(
  CreateEducationLevelDto,
) {}

export class UpdateEducationLevelParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
