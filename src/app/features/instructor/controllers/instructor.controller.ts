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
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { GetInstructorParamDto } from '../dtos/get-instructor.dto';
import { GetInstructorsQueryDto } from '../dtos/get-instructors.dto';
import {
  UpdateInstructorDto,
  UpdateInstructorParamDto,
} from '../dtos/update-instructor.dto';
import { InstructorFilter } from '../filters/instructor.filter';
import { InstructorService } from '../services/instructor.service';

@Controller('instructors')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly instructorFilter: InstructorFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getInstructorsQueryDto: GetInstructorsQueryDto) {
    const filter = this.instructorFilter.findAll(getInstructorsQueryDto);
    const page = getInstructorsQueryDto._page;
    const limit = getInstructorsQueryDto._limit;

    return this.instructorService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getInstructorParamDto: GetInstructorParamDto) {
    return this.instructorService.findOne(getInstructorParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateInstructorParamDto: UpdateInstructorParamDto,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorService.update(
      updateInstructorParamDto.id,
      updateInstructorDto,
    );
  }
}
