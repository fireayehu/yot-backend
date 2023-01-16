import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
