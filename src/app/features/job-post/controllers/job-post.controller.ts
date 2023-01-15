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
import { CreateJobPostDto } from '../dtos/create-job-post.dto';
import { GetJobPostParamDto } from '../dtos/get-job-category.dto';
import { GetJobPostsQueryDto } from '../dtos/get-job-posts.dto';
import {
  UpdateJobPostDto,
  UpdateJobPostParamDto,
} from '../dtos/update-job-post.dto';
import { JobPostFilter } from '../filters/job-post.filter';
import { JobPostService } from '../services/job-post.service';

@Controller('job-posts')
export class JobPostController {
  constructor(
    private readonly jobPostService: JobPostService,
    private readonly jobPostFilter: JobPostFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_POST_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getJobPostsQueryDto: GetJobPostsQueryDto) {
    const filter = this.jobPostFilter.findAll(getJobPostsQueryDto);
    const page = getJobPostsQueryDto._page;
    const limit = getJobPostsQueryDto._limit;

    return this.jobPostService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_POST_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getJobPostParamDto: GetJobPostParamDto) {
    return this.jobPostService.findOne(getJobPostParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_POST_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostService.create(createJobPostDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_POST_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateJobPostParamDto: UpdateJobPostParamDto,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ) {
    return this.jobPostService.update(
      updateJobPostParamDto.id,
      updateJobPostDto,
    );
  }
}
