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
import { CreateSectionDto } from '../dtos/create-section.dto';
import { GetSectionParamDto } from '../dtos/get-section.dto';
import { GetSectionsQueryDto } from '../dtos/get-sections.dto';
import {
  UpdateSectionDto,
  UpdateSectionParamDto,
} from '../dtos/update-section.dto';
import { SectionFilter } from '../filters/section.filter';
import { SectionService } from '../services/section.service';

@Controller('sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly sectionFilter: SectionFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SECTION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getSectionsQueryDto: GetSectionsQueryDto) {
    const filter = this.sectionFilter.findAll(getSectionsQueryDto);
    const page = getSectionsQueryDto._page;
    const limit = getSectionsQueryDto._limit;

    return this.sectionService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SECTION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getSectionParamDto: GetSectionParamDto) {
    return this.sectionService.findOne(getSectionParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SECTION_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SECTION_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateSectionParamDto: UpdateSectionParamDto,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(
      updateSectionParamDto.id,
      updateSectionDto,
    );
  }
}
