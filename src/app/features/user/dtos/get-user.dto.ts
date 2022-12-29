import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
