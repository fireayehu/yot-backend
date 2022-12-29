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
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { GetEmployeeParamDto } from '../dtos/get-employee.dto';
import { GetEmployeesQueryDto } from '../dtos/get-employees.dto';
import {
  UpdateEmployeeDto,
  UpdateEmployeeParamDto,
} from '../dtos/update-employee.dto';
import { EmployeeFilter } from '../filters/employee.filter';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeeFilter: EmployeeFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EMPLOYEE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getEmployeesQueryDto: GetEmployeesQueryDto) {
    const filter = this.employeeFilter.findAll(getEmployeesQueryDto);
    const page = getEmployeesQueryDto._page;
    const limit = getEmployeesQueryDto._limit;

    return this.employeeService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EMPLOYEE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getEmployeeParamDto: GetEmployeeParamDto) {
    return this.employeeService.findOne(getEmployeeParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EMPLOYEE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EMPLOYEE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateEmployeeParamDto: UpdateEmployeeParamDto,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(
      updateEmployeeParamDto.id,
      updateEmployeeDto,
    );
  }
}
