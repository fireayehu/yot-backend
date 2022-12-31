import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}

export class UpdateStaffParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
