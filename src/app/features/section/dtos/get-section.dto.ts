import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetSectionParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
