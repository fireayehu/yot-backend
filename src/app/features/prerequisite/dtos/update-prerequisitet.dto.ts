import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePrerequisiteDto } from './create-prerequisite.dto';

export class UpdatePrerequisiteDto extends PartialType(CreatePrerequisiteDto) {}

export class UpdatePrerequisiteParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
