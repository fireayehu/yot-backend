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
import { CreateEducationFieldDto } from '../dtos/create-education-field.dto';
import { GetEducationFieldParamDto } from '../dtos/get-education-field.dto';
import { GetEducationFieldsQueryDto } from '../dtos/get-education-fields.dto';
import {
  UpdateEducationFieldDto,
  UpdateEducationFieldParamDto,
} from '../dtos/update-education-field.dto';
import { EducationFieldFilter } from '../filters/education-field.filter';
import { EducationFieldService } from '../services/education-field.service';

@Controller('education-fields')
export class EducationFieldController {
  constructor(
    private readonly educationFieldService: EducationFieldService,
    private readonly educationFieldFilter: EducationFieldFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_FIELD_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getEducationFieldsQueryDto: GetEducationFieldsQueryDto,
  ) {
    const filter = this.educationFieldFilter.findAll(
      getEducationFieldsQueryDto,
    );
    const page = getEducationFieldsQueryDto._page;
    const limit = getEducationFieldsQueryDto._limit;

    return this.educationFieldService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_FIELD_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getEducationFieldParamDto: GetEducationFieldParamDto) {
    return this.educationFieldService.findOne(getEducationFieldParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_FIELD_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEducationFieldDto: CreateEducationFieldDto) {
    return this.educationFieldService.create(createEducationFieldDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_FIELD_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateEducationFieldParamDto: UpdateEducationFieldParamDto,
    @Body() updateEducationFieldDto: UpdateEducationFieldDto,
  ) {
    return this.educationFieldService.update(
      updateEducationFieldParamDto.id,
      updateEducationFieldDto,
    );
  }
}
