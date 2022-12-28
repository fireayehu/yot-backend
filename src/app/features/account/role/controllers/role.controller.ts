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
import { CheckPolicies } from '../../auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { PoliciesGuard } from '../../auth/guards/policy.guard';
import { PermissionType } from '../../permission/enums/permission.enum';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { GetRoleParamDto } from '../dtos/get-role.dto';
import { GetRolesQueryDto } from '../dtos/get-roles.dto';
import { UpdateRoleDto, UpdateRoleParamDto } from '../dtos/update-role.dto';
import { RoleFilter } from '../filters/role.filter';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleFilter: RoleFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.ROLE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getRolesQueryDto: GetRolesQueryDto) {
    const filter = this.roleFilter.findAll(getRolesQueryDto);
    const page = getRolesQueryDto._page;
    const limit = getRolesQueryDto._limit;

    return this.roleService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.ROLE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getRoleParamDto: GetRoleParamDto) {
    return this.roleService.findOne(getRoleParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.ROLE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.ROLE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateRoleParamDto: UpdateRoleParamDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(updateRoleParamDto.id, updateRoleDto);
  }
}
