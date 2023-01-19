import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetBlogCategoryParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
