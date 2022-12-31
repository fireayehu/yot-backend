import { Transform, Type } from 'class-transformer';
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
  educationPlace: EducationPlace;

  @IsNotEmpty()
  @IsUUID()
  educationField: EducationField;

  @IsNotEmpty()
  @IsUUID()
  educationLevel: EducationLevel;
}

export class CreateInstructorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InstructorDto)
  instructor: InstructorDto;
}
