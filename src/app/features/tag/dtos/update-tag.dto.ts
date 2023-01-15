import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}

export class UpdateTagParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
