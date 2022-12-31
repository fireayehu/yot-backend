import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetStaffParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
