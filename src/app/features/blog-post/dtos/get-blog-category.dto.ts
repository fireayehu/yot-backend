import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetBlogPostParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
