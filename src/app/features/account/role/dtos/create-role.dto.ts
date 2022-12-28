import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { RolePermission } from 'src/app/entities/role-permission.entity';
import { ToBoolean } from 'src/app/shared/transformers/to-boolean.transformer';

export class PermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  @ToBoolean()
  granted: boolean;

  @IsNotEmpty()
  @IsUUID()
  permission: string;
}

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => PermissionDto)
  permissions: RolePermission[];
}
