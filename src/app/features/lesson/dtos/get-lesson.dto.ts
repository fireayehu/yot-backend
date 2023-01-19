import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetLessonParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
