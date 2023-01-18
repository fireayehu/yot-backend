import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from 'src/app/entities/category.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsOptional()
  @IsString()
  preview: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  category: Category;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
