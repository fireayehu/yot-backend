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
import { CreateSessionDto } from '../dtos/create-session.dto';
import { GetSessionParamDto } from '../dtos/get-session.dto';
import { GetSessionsQueryDto } from '../dtos/get-sessions.dto';
import {
  UpdateSessionDto,
  UpdateSessionParamDto,
} from '../dtos/update-session.dto';
import { SessionFilter } from '../filters/session.filter';
import { SessionService } from '../services/session.service';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly sessionFilter: SessionFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SESSION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getSessionsQueryDto: GetSessionsQueryDto) {
    const filter = this.sessionFilter.findAll(getSessionsQueryDto);
    const page = getSessionsQueryDto._page;
    const limit = getSessionsQueryDto._limit;

    return this.sessionService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SESSION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getSessionParamDto: GetSessionParamDto) {
    return this.sessionService.findOne(getSessionParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SESSION_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SESSION_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateSessionParamDto: UpdateSessionParamDto,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionService.update(
      updateSessionParamDto.id,
      updateSessionDto,
    );
  }
}
