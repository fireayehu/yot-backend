import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckPolicies } from '../../auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { PoliciesGuard } from '../../auth/guards/policy.guard';
import { PermissionType } from '../enums/permission.enum';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.PERMISSION_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.permissionService.findAll();
  }
}
