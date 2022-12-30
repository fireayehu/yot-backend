import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

export class CreateEducationLevelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  shortCode: string;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
