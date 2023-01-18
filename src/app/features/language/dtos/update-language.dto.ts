import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateLanguageDto } from './create-language.dto';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}

export class UpdateLanguageParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
