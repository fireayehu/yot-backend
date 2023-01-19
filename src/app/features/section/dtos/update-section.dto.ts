import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateSectionDto } from './create-section.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {}

export class UpdateSectionParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
