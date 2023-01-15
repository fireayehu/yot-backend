import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetJobCategoryParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
