import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEducationPlaceDto } from './create-education-place.dto';

export class UpdateEducationPlaceDto extends PartialType(
  CreateEducationPlaceDto,
) {}

export class UpdateEducationPlaceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
