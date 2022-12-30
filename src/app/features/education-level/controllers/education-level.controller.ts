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
import { CreateEducationLevelDto } from '../dtos/create-education-level.dto';
import { GetEducationLevelParamDto } from '../dtos/get-education-level.dto';
import { GetEducationLevelsQueryDto } from '../dtos/get-education-levels.dto';
import {
  UpdateEducationLevelDto,
  UpdateEducationLevelParamDto,
} from '../dtos/update-education-level.dto';
import { EducationLevelFilter } from '../filters/education-level.filter';
import { EducationLevelService } from '../services/education-level.service';

@Controller('education-levels')
export class EducationLevelController {
  constructor(
    private readonly educationLevelService: EducationLevelService,
    private readonly educationLevelFilter: EducationLevelFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_LEVEL_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getEducationLevelsQueryDto: GetEducationLevelsQueryDto,
  ) {
    const filter = this.educationLevelFilter.findAll(
      getEducationLevelsQueryDto,
    );
    const page = getEducationLevelsQueryDto._page;
    const limit = getEducationLevelsQueryDto._limit;

    return this.educationLevelService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_LEVEL_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getEducationLevelParamDto: GetEducationLevelParamDto) {
    return this.educationLevelService.findOne(getEducationLevelParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_LEVEL_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEducationLevelDto: CreateEducationLevelDto) {
    return this.educationLevelService.create(createEducationLevelDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_LEVEL_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateEducationLevelParamDto: UpdateEducationLevelParamDto,
    @Body() updateEducationLevelDto: UpdateEducationLevelDto,
  ) {
    return this.educationLevelService.update(
      updateEducationLevelParamDto.id,
      updateEducationLevelDto,
    );
  }
}
