import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Role } from 'src/app/entities/role.entity';

export class CreateStaffDto {
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

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsUUID()
  role: Role;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
