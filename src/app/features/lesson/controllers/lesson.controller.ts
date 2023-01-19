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
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { GetLessonParamDto } from '../dtos/get-lesson.dto';
import { GetLessonsQueryDto } from '../dtos/get-lessons.dto';
import {
  UpdateLessonDto,
  UpdateLessonParamDto,
} from '../dtos/update-lesson.dto';
import { LessonFilter } from '../filters/lesson.filter';
import { LessonService } from '../services/lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly lessonFilter: LessonFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.LESSON_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getLessonsQueryDto: GetLessonsQueryDto) {
    const filter = this.lessonFilter.findAll(getLessonsQueryDto);
    const page = getLessonsQueryDto._page;
    const limit = getLessonsQueryDto._limit;

    return this.lessonService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.LESSON_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getLessonParamDto: GetLessonParamDto) {
    return this.lessonService.findOne(getLessonParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.LESSON_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.LESSON_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateLessonParamDto: UpdateLessonParamDto,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.update(updateLessonParamDto.id, updateLessonDto);
  }
}
