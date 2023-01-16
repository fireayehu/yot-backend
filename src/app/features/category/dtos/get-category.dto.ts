import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCategoryParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
