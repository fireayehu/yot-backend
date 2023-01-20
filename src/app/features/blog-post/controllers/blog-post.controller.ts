import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/app/entities/user.entity';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { GetUser } from '../../account/auth/decorator/user.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateBlogPostDto } from '../dtos/create-blog-post.dto';
import { GetBlogPostParamDto } from '../dtos/get-blog-category.dto';
import { GetBlogPostsQueryDto } from '../dtos/get-blog-posts.dto';
import {
  UpdateBlogPostDto,
  UpdateBlogPostParamDto,
} from '../dtos/update-blog-post.dto';
import { BlogPostFilter } from '../filters/blog-post.filter';
import { BlogPostService } from '../services/blog-post.service';

@Controller('blog-posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly blogPostFilter: BlogPostFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_POST_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getBlogPostsQueryDto: GetBlogPostsQueryDto) {
    const filter = this.blogPostFilter.findAll(getBlogPostsQueryDto);
    const page = getBlogPostsQueryDto._page;
    const limit = getBlogPostsQueryDto._limit;

    return this.blogPostService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_POST_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getBlogPostParamDto: GetBlogPostParamDto) {
    return this.blogPostService.findOne(getBlogPostParamDto.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_POST_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @GetUser('id') id: User,
    @Body() createBlogPostDto: CreateBlogPostDto,
  ) {
    if (file) {
      createBlogPostDto.image = file.key;
    }
    createBlogPostDto.author = id;
    return this.blogPostService.create(createBlogPostDto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_POST_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() updateBlogPostParamDto: UpdateBlogPostParamDto,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    if (file) {
      updateBlogPostDto.image = file.key;
    }
    return this.blogPostService.update(
      updateBlogPostParamDto.id,
      updateBlogPostDto,
    );
  }
}
