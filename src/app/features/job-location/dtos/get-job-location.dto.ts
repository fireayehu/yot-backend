import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetJobLocationParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
