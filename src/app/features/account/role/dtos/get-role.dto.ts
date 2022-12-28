import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRoleParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
