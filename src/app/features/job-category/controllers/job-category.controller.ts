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
import { CreateJobCategoryDto } from '../dtos/create-job-category.dto';
import { GetJobCategoryParamDto } from '../dtos/get-job-category.dto';
import { GetJobCategoriesQueryDto } from '../dtos/get-job-categories.dto';
import {
  UpdateJobCategoryDto,
  UpdateJobCategoryParamDto,
} from '../dtos/update-job-category.dto';
import { JobCategoryService } from '../services/job-category.service';
import { JobCategoryFilter } from '../filters/job-category.filter';

@Controller('job-categories')
export class JobCategoryController {
  constructor(
    private readonly jobCategoryService: JobCategoryService,
    private readonly jobCategoryFilter: JobCategoryFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getJobCategoriesQueryDto: GetJobCategoriesQueryDto) {
    const filter = this.jobCategoryFilter.findAll(getJobCategoriesQueryDto);
    const page = getJobCategoriesQueryDto._page;
    const limit = getJobCategoriesQueryDto._limit;

    return this.jobCategoryService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_CATEGORY_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getJobCategoryParamDto: GetJobCategoryParamDto) {
    return this.jobCategoryService.findOne(getJobCategoryParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_CATEGORY_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_CATEGORY_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateJobCategoryParamDto: UpdateJobCategoryParamDto,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.update(
      updateJobCategoryParamDto.id,
      updateJobCategoryDto,
    );
  }
}
