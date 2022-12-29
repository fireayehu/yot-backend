import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AbstractDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _page = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _limit = 10;

  @IsOptional()
  @IsString()
  _search: string;
}
