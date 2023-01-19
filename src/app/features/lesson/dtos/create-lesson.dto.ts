import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Section } from 'src/app/entities/section.entity';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsUUID()
  durationUnit: DataLookup;

  @IsNotEmpty()
  @IsUUID()
  section: Section;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
