import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetInstructorParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
