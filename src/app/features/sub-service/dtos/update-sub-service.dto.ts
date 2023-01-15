import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateSubServiceDto } from './create-sub-service.dto';

export class UpdateSubServiceDto extends PartialType(CreateSubServiceDto) {}

export class UpdateSubServiceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
