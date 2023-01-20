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
import { CreateUserSubServiceDto } from '../dtos/create-user-sub-service.dto';
import { GetUserSubServiceParamDto } from '../dtos/get-user-sub-service.dto';
import { GetUserSubServicesQueryDto } from '../dtos/get-user-sub-services.dto';
import {
  UpdateUserSubServiceDto,
  UpdateUserSubServiceParamDto,
} from '../dtos/update-user-sub-service.dto';
import { UserSubServiceFilter } from '../filters/user-sub-service.filter';
import { UserSubServiceService } from '../services/user-sub-service.service';

@Controller('user-sub-services')
export class UserSubServiceController {
  constructor(
    private readonly userSubServiceService: UserSubServiceService,
    private readonly userSubServiceFilter: UserSubServiceFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_SUB_SERVICE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getUserSubServicesQueryDto: GetUserSubServicesQueryDto,
  ) {
    const filter = this.userSubServiceFilter.findAll(
      getUserSubServicesQueryDto,
    );
    const page = getUserSubServicesQueryDto._page;
    const limit = getUserSubServicesQueryDto._limit;

    return this.userSubServiceService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_SUB_SERVICE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getUserSubServiceParamDto: GetUserSubServiceParamDto) {
    return this.userSubServiceService.findOne(getUserSubServiceParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_SUB_SERVICE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserSubServiceDto: CreateUserSubServiceDto) {
    return this.userSubServiceService.create(createUserSubServiceDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_SUB_SERVICE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateUserSubServiceParamDto: UpdateUserSubServiceParamDto,
    @Body() updateUserSubServiceDto: UpdateUserSubServiceDto,
  ) {
    return this.userSubServiceService.update(
      updateUserSubServiceParamDto.id,
      updateUserSubServiceDto,
    );
  }
}
