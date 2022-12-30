import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { EducationField } from 'src/app/entities/education-field.entity';
import { EducationLevel } from 'src/app/entities/education-level.entity';
import { EducationPlace } from 'src/app/entities/education-place.entity';

export class InstructorDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  educationPlace: EducationPlace;

  @IsOptional()
  @IsUUID()
  educationField: EducationField;

  @IsOptional()
  @IsUUID()
  educationLevel: EducationLevel;
}

export class UpdateInstructorDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsOptional()
  @IsUUID()
  state: DataLookup;

  @IsOptional()
  @ValidateNested()
  @Type(() => InstructorDto)
  instructor: InstructorDto;
}

export class UpdateInstructorParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
