import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}

export class UpdateModuleParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
