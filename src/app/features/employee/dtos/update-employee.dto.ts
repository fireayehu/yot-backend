import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class UpdateEmployeeParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
