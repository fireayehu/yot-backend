import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { JobCategory } from 'src/app/entities/job-category.entity';
import { JobLocation } from 'src/app/entities/job-location.entity';

export class CreateJobPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  type: DataLookup;

  @IsNotEmpty()
  @IsUUID()
  category: JobCategory;

  @IsNotEmpty()
  @IsUUID()
  location: JobLocation;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
