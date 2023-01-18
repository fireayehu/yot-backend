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
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateJobApplicationDto } from '../dtos/create-job-application.dto';
import { GetJobApplicationParamDto } from '../dtos/get-job-application.dto';
import { GetJobApplicationsQueryDto } from '../dtos/get-job-applications.dto';
import {
  UpdateJobApplicationDto,
  UpdateJobApplicationParamDto,
} from '../dtos/update-job-application.dto';
import { JobApplicationFilter } from '../filters/job-application.filter';
import { JobApplicationService } from '../services/job-application.service';

@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly jobApplicationFilter: JobApplicationFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_APPLICATION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getJobApplicationsQueryDto: GetJobApplicationsQueryDto,
  ) {
    const filter = this.jobApplicationFilter.findAll(
      getJobApplicationsQueryDto,
    );
    const page = getJobApplicationsQueryDto._page;
    const limit = getJobApplicationsQueryDto._limit;

    return this.jobApplicationService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_APPLICATION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getJobApplicationParamDto: GetJobApplicationParamDto) {
    return this.jobApplicationService.findOne(getJobApplicationParamDto.id);
  }

  @UseInterceptors(FileInterceptor('resume'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_APPLICATION_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    if (file) {
      createJobApplicationDto.resume = file.key;
    }
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @UseInterceptors(FileInterceptor('resume'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.JOB_APPLICATION_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() updateJobApplicationParamDto: UpdateJobApplicationParamDto,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    if (file) {
      updateJobApplicationDto.resume = file.key;
    }
    return this.jobApplicationService.update(
      updateJobApplicationParamDto.id,
      updateJobApplicationDto,
    );
  }
}
