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
import { CreateEducationPlaceDto } from '../dtos/create-education-place.dto';
import { GetEducationPlaceParamDto } from '../dtos/get-education-place.dto';
import { GetEducationPlacesQueryDto } from '../dtos/get-education-places.dto';
import {
  UpdateEducationPlaceDto,
  UpdateEducationPlaceParamDto,
} from '../dtos/update-education-place.dto';
import { EducationPlaceFilter } from '../filters/education-place.filter';
import { EducationPlaceService } from '../services/education-place.service';

@Controller('education-places')
export class EducationPlaceController {
  constructor(
    private readonly educationPlaceService: EducationPlaceService,
    private readonly educationPlaceFilter: EducationPlaceFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_PLACE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() getEducationPlacesQueryDto: GetEducationPlacesQueryDto,
  ) {
    const filter = this.educationPlaceFilter.findAll(
      getEducationPlacesQueryDto,
    );
    const page = getEducationPlacesQueryDto._page;
    const limit = getEducationPlacesQueryDto._limit;

    return this.educationPlaceService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_PLACE_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getEducationPlaceParamDto: GetEducationPlaceParamDto) {
    return this.educationPlaceService.findOne(getEducationPlaceParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_PLACE_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEducationPlaceDto: CreateEducationPlaceDto) {
    return this.educationPlaceService.create(createEducationPlaceDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.EDUCATION_PLACE_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateEducationPlaceParamDto: UpdateEducationPlaceParamDto,
    @Body() updateEducationPlaceDto: UpdateEducationPlaceDto,
  ) {
    return this.educationPlaceService.update(
      updateEducationPlaceParamDto.id,
      updateEducationPlaceDto,
    );
  }
}
