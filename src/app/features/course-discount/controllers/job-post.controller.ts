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
import { CreateCourseDiscountDto } from '../dtos/create-course-discount.dto';
import { GetCourseDiscountParamDto } from '../dtos/get-course-discount.dto';
import { GetCourseDiscountsQueryDto } from '../dtos/get-course-discounts.dto';
import {
  UpdateCourseDiscountDto,
  UpdateCourseDiscountParamDto,
} from '../dtos/update-course-discount.dto';
import { CourseDiscountFilter } from '../filters/course-discount.filter';
import { CourseDiscountService } from '../services/course-discount.service';

@Controller('course-discounts')
export class CourseDiscountController {
  constructor(
    private readonly courseDiscountService: CourseDiscountService,
    private readonly courseDiscountFilter: CourseDiscountFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_DISCOUNT_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getCourseDiscountsQueryDto: GetCourseDiscountsQueryDto,
  ) {
    const filter = this.courseDiscountFilter.findAll(
      getCourseDiscountsQueryDto,
    );
    const page = getCourseDiscountsQueryDto._page;
    const limit = getCourseDiscountsQueryDto._limit;

    return this.courseDiscountService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_DISCOUNT_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getCourseDiscountParamDto: GetCourseDiscountParamDto) {
    return this.courseDiscountService.findOne(getCourseDiscountParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_DISCOUNT_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseDiscountDto: CreateCourseDiscountDto) {
    return this.courseDiscountService.create(createCourseDiscountDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.COURSE_DISCOUNT_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateCourseDiscountParamDto: UpdateCourseDiscountParamDto,
    @Body() updateCourseDiscountDto: UpdateCourseDiscountDto,
  ) {
    return this.courseDiscountService.update(
      updateCourseDiscountParamDto.id,
      updateCourseDiscountDto,
    );
  }
}
