import { IsOptional, IsString } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

export class GetServicesQueryDto {
  @IsOptional()
  @IsString()
  type: DataLookup;

  @IsOptional()
  @IsString()
  state: DataLookup;
}
