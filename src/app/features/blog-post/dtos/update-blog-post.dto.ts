import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateBlogPostDto } from './create-blog-post.dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}

export class UpdateBlogPostParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
