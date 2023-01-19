import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateBlogCategoryDto } from '../dtos/create-blog-category.dto';
import { GetBlogCategoryParamDto } from '../dtos/get-blog-category.dto';
import { GetBlogCategoriesQueryDto } from '../dtos/get-blog-categories.dto';
import {
  UpdateBlogCategoryDto,
  UpdateBlogCategoryParamDto,
} from '../dtos/update-blog-category.dto';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryFilter } from '../filters/blog-category.filter';

@Controller('blog-categories')
export class BlogCategoryController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService,
    private readonly blogCategoryFilter: BlogCategoryFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getBlogCategoriesQueryDto: GetBlogCategoriesQueryDto) {
    const filter = this.blogCategoryFilter.findAll(getBlogCategoriesQueryDto);
    const page = getBlogCategoriesQueryDto._page;
    const limit = getBlogCategoriesQueryDto._limit;

    return this.blogCategoryService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getBlogCategoryParamDto: GetBlogCategoryParamDto) {
    return this.blogCategoryService.findOne(getBlogCategoryParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_CATEGORY_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
    return this.blogCategoryService.create(createBlogCategoryDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.BLOG_CATEGORY_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateBlogCategoryParamDto: UpdateBlogCategoryParamDto,
    @Body() pdateBlogCategoryDto: UpdateBlogCategoryDto,
  ) {
    return this.blogCategoryService.update(
      updateBlogCategoryParamDto.id,
      pdateBlogCategoryDto,
    );
  }
}
