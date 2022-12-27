import { IsOptional, IsString } from 'class-validator';

export class GetDataLookupsQueryDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  category: string;
}
