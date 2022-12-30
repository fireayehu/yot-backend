import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetEducationPlaceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
