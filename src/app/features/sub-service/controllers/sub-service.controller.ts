import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateSubServiceDto } from '../dtos/create-sub-service.dto';
import { GetSubServiceParamDto } from '../dtos/get-sub-service.dto';
import { GetSubServicesQueryDto } from '../dtos/get-sub-services.dto';
import {
  UpdateSubServiceDto,
  UpdateSubServiceParamDto,
} from '../dtos/update-sub-service.dto';
import { SubServiceFilter } from '../filters/sub-service.filter';
import { SubServiceService } from '../services/sub-service.service';

@Controller('sub-services')
export class SubServiceController {
  constructor(
    private readonly subServiceService: SubServiceService,
    private readonly subServiceFilter: SubServiceFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SUB_SERVICE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getSubServicesQueryDto: GetSubServicesQueryDto) {
    const filter = this.subServiceFilter.findAll(getSubServicesQueryDto);
    const page = getSubServicesQueryDto._page;
    const limit = getSubServicesQueryDto._limit;

    return this.subServiceService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SUB_SERVICE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getSubServiceParamDto: GetSubServiceParamDto) {
    return this.subServiceService.findOne(getSubServiceParamDto.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SUB_SERVICE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() createSubServiceDto: CreateSubServiceDto,
  ) {
    if (file) {
      createSubServiceDto.image = file.key;
    }
    return this.subServiceService.create(createSubServiceDto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.SUB_SERVICE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() updateSubServiceParamDto: UpdateSubServiceParamDto,
    @Body() updateSubServiceDto: UpdateSubServiceDto,
  ) {
    if (file) {
      updateSubServiceDto.image = file.key;
    }
    return this.subServiceService.update(
      updateSubServiceParamDto.id,
      updateSubServiceDto,
    );
  }
}
