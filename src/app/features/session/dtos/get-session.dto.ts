import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetSessionParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
