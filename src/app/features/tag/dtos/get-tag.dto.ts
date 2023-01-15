import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTagParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
