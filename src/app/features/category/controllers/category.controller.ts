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
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { GetCategoryParamDto } from '../dtos/get-category.dto';
import { GetCategoriesQueryDto } from '../dtos/get-categories.dto';
import {
  UpdateCategoryDto,
  UpdateCategoryParamDto,
} from '../dtos/update-category.dto';
import { CategoryService } from '../services/category.service';
import { CategoryFilter } from '../filters/category.filter';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFilter: CategoryFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getCategoriesQueryDto: GetCategoriesQueryDto) {
    const filter = this.categoryFilter.findAll(getCategoriesQueryDto);
    const page = getCategoriesQueryDto._page;
    const limit = getCategoriesQueryDto._limit;

    return this.categoryService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getCategoryParamDto: GetCategoryParamDto) {
    return this.categoryService.findOne(getCategoryParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CATEGORY_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CATEGORY_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateCategoryParamDto: UpdateCategoryParamDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(
      updateCategoryParamDto.id,
      updateCategoryDto,
    );
  }
}
