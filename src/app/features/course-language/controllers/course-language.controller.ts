import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateCourseLanguageDto } from '../dtos/create-course-language.dto';
import { DeleteCourseLanguageDto } from '../dtos/delete-course-language.dto';
import { CourseLanguageService } from '../services/course-language.service';

@Controller('course-languages')
export class CourseLanguageController {
  constructor(private readonly courseLanguageService: CourseLanguageService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_LANGUAGE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseLanguageDto: CreateCourseLanguageDto) {
    return this.courseLanguageService.create(createCourseLanguageDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_LANGUAGE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() deleteCourseLanguageDto: DeleteCourseLanguageDto) {
    return this.courseLanguageService.delete(deleteCourseLanguageDto);
  }
}
