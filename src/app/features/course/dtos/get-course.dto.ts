import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCourseParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
