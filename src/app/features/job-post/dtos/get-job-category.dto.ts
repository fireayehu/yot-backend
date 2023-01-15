import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetJobPostParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
