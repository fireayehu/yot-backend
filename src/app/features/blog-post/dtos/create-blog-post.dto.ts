import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BlogCategory } from 'src/app/entities/blog-category.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { User } from 'src/app/entities/user.entity';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  @Transform(({ value }) => JSON.parse(value))
  content: object;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration: number;

  @IsOptional()
  @IsUUID()
  durationUnit: DataLookup;

  @IsNotEmpty()
  @IsUUID()
  category: BlogCategory;

  @IsOptional()
  @IsUUID()
  author: User;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
