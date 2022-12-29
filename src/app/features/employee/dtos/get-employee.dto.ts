import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetEmployeeParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
