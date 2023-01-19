import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateCourseTagDto } from '../dtos/create-course-tag.dto';
import { DeleteCourseTagDto } from '../dtos/delete-course-tag.dto';
import { CourseTagService } from '../services/course-tag.service';

@Controller('course-tags')
export class CourseTagController {
  constructor(private readonly courseDiscountService: CourseTagService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_TAG_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseTagDto: CreateCourseTagDto) {
    return this.courseDiscountService.create(createCourseTagDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_TAG_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() deleteCourseTagDto: DeleteCourseTagDto) {
    return this.courseDiscountService.delete(deleteCourseTagDto);
  }
}
