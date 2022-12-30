import { IsOptional, IsUUID } from 'class-validator';
import { AbstractDto } from 'src/app/shared/dtos/abstract.dto';

export class GetInstructorsQueryDto extends AbstractDto {
  @IsOptional()
  @IsUUID()
  state: string;
}
