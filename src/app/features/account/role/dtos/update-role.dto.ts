import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

export class UpdateRoleParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
