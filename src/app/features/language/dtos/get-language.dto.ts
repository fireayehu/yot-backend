import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetLanguageParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
