import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AbstractDto {
  @IsOptional()
  @IsNumber()
  _page = 1;

  @IsOptional()
  @IsNumber()
  _limit = 10;

  @IsOptional()
  @IsString()
  _search: string;
}
