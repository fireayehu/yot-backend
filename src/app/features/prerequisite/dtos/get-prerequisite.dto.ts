import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPrerequisiteParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
