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
import { CreateJobLocationDto } from '../dtos/create-job-location.dto';
import { GetJobLocationParamDto } from '../dtos/get-job-location.dto';
import { GetJobLocationsQueryDto } from '../dtos/get-job-locations.dto';
import {
  UpdateJobLocationDto,
  UpdateJobLocationParamDto,
} from '../dtos/update-job-location.dto';
import { JobLocationFilter } from '../filters/job-location.filter';
import { JobLocationService } from '../services/job-location.service';

@Controller('job-locations')
export class JobLocationController {
  constructor(
    private readonly jobLocationService: JobLocationService,
    private readonly jobLocationFilter: JobLocationFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_LOCATION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getJobLocationsQueryDto: GetJobLocationsQueryDto) {
    const filter = this.jobLocationFilter.findAll(getJobLocationsQueryDto);
    const page = getJobLocationsQueryDto._page;
    const limit = getJobLocationsQueryDto._limit;

    return this.jobLocationService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_LOCATION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getJobLocationParamDto: GetJobLocationParamDto) {
    return this.jobLocationService.findOne(getJobLocationParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_LOCATION_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobLocationDto: CreateJobLocationDto) {
    return this.jobLocationService.create(createJobLocationDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_LOCATION_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateJobLocationParamDto: UpdateJobLocationParamDto,
    @Body() updateJobLocationDto: UpdateJobLocationDto,
  ) {
    return this.jobLocationService.update(
      updateJobLocationParamDto.id,
      updateJobLocationDto,
    );
  }
}
