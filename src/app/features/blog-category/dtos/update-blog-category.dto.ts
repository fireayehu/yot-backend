import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateBlogCategoryDto } from './create-blog-category.dto';

export class UpdateBlogCategoryDto extends PartialType(CreateBlogCategoryDto) {}

export class UpdateBlogCategoryParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
