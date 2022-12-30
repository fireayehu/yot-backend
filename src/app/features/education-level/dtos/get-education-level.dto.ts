import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetEducationLevelParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
