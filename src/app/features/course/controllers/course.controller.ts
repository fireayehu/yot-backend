import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { GetCourseParamDto } from '../dtos/get-course.dto';
import { GetCoursesQueryDto } from '../dtos/get-courses.dto';
import {
  UpdateCourseDto,
  UpdateCourseParamDto,
} from '../dtos/update-course.dto';
import { CourseFilter } from '../filters/course.filter';
import { ICourseUploadedFiles } from '../interfaces/course-uploaded-files.interface';
import { CourseService } from '../services/sub-service.service';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseFilter: CourseFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getCoursesQueryDto: GetCoursesQueryDto) {
    const filter = this.courseFilter.findAll(getCoursesQueryDto);
    const page = getCoursesQueryDto._page;
    const limit = getCoursesQueryDto._limit;

    return this.courseService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getCourseParamDto: GetCourseParamDto) {
    return this.courseService.findOne(getCourseParamDto.id);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'preview', maxCount: 1 },
    ]),
  )
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFiles() files: ICourseUploadedFiles,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    if (files?.image) {
      createCourseDto.image = files.image[0].key;
    }
    if (files?.preview) {
      createCourseDto.preview = files.preview[0].key;
    }
    return this.courseService.create(createCourseDto);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'preview', maxCount: 1 },
    ]),
  )
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFiles() files: ICourseUploadedFiles,
    @Param() updateCourseParamDto: UpdateCourseParamDto,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    if (files?.image) {
      updateCourseDto.image = files.image[0].key;
    }
    if (files?.preview) {
      updateCourseDto.preview = files.preview[0].key;
    }
    return this.courseService.update(updateCourseParamDto.id, updateCourseDto);
  }
}
