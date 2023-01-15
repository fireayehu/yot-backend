import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { AbstractDto } from 'src/app/shared/dtos/abstract.dto';

export class GetContactUsParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class GetContactUsQueryDto extends AbstractDto {
  @IsOptional()
  @IsUUID()
  subService: string;

  @IsOptional()
  @IsUUID()
  state: string;
}
