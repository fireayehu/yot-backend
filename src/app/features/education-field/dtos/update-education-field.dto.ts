import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEducationFieldDto } from './create-education-field.dto';

export class UpdateEducationFieldDto extends PartialType(
  CreateEducationFieldDto,
) {}

export class UpdateEducationFieldParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
