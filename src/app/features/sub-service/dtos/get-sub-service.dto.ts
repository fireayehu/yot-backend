import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetSubServiceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
