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
import { CreateModuleDto } from '../dtos/create-module.dto';
import { GetModuleParamDto } from '../dtos/get-module.dto';
import { GetModulesQueryDto } from '../dtos/get-modules.dto';
import {
  UpdateModuleDto,
  UpdateModuleParamDto,
} from '../dtos/update-module.dto';
import { ModuleFilter } from '../filters/module.filter';
import { ModuleService } from '../services/module.service';

@Controller('modules')
export class ModuleController {
  constructor(
    private readonly moduleService: ModuleService,
    private readonly moduleFilter: ModuleFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.MODULE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getModulesQueryDto: GetModulesQueryDto) {
    const filter = this.moduleFilter.findAll(getModulesQueryDto);
    const page = getModulesQueryDto._page;
    const limit = getModulesQueryDto._limit;

    return this.moduleService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.MODULE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getModuleParamDto: GetModuleParamDto) {
    return this.moduleService.findOne(getModuleParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.MODULE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.MODULE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateModuleParamDto: UpdateModuleParamDto,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.moduleService.update(updateModuleParamDto.id, updateModuleDto);
  }
}
