import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCourseDiscountParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
