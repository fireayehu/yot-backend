import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetJobApplicationParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
