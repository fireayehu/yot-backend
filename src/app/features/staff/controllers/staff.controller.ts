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
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { GetStaffParamDto } from '../dtos/get-staff.dto';
import { GetStaffsQueryDto } from '../dtos/get-staffs.dto';
import { UpdateStaffDto, UpdateStaffParamDto } from '../dtos/update-staff.dto';
import { StaffFilter } from '../filters/staff.filter';
import { StaffService } from '../services/staff.service';

@Controller('staffs')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly staffFilter: StaffFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.STAFF_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getStaffsQueryDto: GetStaffsQueryDto) {
    const filter = this.staffFilter.findAll(getStaffsQueryDto);
    const page = getStaffsQueryDto._page;
    const limit = getStaffsQueryDto._limit;

    return this.staffService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.STAFF_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getStaffParamDto: GetStaffParamDto) {
    return this.staffService.findOne(getStaffParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.STAFF_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.STAFF_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateStaffParamDto: UpdateStaffParamDto,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.update(updateStaffParamDto.id, updateStaffDto);
  }
}
