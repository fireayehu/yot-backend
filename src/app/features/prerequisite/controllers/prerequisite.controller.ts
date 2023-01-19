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
import { CreatePrerequisiteDto } from '../dtos/create-prerequisite.dto';
import { GetPrerequisiteParamDto } from '../dtos/get-prerequisite.dto';
import { GetPrerequisitesQueryDto } from '../dtos/get-prerequisites.dto';
import {
  UpdatePrerequisiteDto,
  UpdatePrerequisiteParamDto,
} from '../dtos/update-prerequisitet.dto';
import { PrerequisiteFilter } from '../filters/prerequisite.filter';
import { PrerequisiteService } from '../services/prerequisite.service';

@Controller('prerequisites')
export class PrerequisiteController {
  constructor(
    private readonly prerequisiteService: PrerequisiteService,
    private readonly prerequisiteFilter: PrerequisiteFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.PREREQUISITE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getPrerequisitesQueryDto: GetPrerequisitesQueryDto) {
    const filter = this.prerequisiteFilter.findAll(getPrerequisitesQueryDto);
    const page = getPrerequisitesQueryDto._page;
    const limit = getPrerequisitesQueryDto._limit;

    return this.prerequisiteService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.PREREQUISITE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getPrerequisiteParamDto: GetPrerequisiteParamDto) {
    return this.prerequisiteService.findOne(getPrerequisiteParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.PREREQUISITE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPrerequisiteDto: CreatePrerequisiteDto) {
    return this.prerequisiteService.create(createPrerequisiteDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.PREREQUISITE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updatePrerequisiteParamDto: UpdatePrerequisiteParamDto,
    @Body() updatePrerequisiteDto: UpdatePrerequisiteDto,
  ) {
    return this.prerequisiteService.update(
      updatePrerequisiteParamDto.id,
      updatePrerequisiteDto,
    );
  }
}
