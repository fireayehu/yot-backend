import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetModuleParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
