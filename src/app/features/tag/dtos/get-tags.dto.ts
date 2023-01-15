import { IsOptional, IsUUID } from 'class-validator';
import { AbstractDto } from 'src/app/shared/dtos/abstract.dto';

export class GetTagsQueryDto extends AbstractDto {
  @IsOptional()
  @IsUUID()
  state: string;
}
