import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetEducationFieldParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
