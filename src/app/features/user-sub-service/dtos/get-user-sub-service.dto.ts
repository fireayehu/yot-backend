import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserSubServiceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
