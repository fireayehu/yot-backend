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
import { CreateLanguageDto } from '../dtos/create-language.dto';
import { GetLanguageParamDto } from '../dtos/get-language.dto';
import { GetLanguagesQueryDto } from '../dtos/get-languages.dto';
import {
  UpdateLanguageDto,
  UpdateLanguageParamDto,
} from '../dtos/update-language.dto';
import { LanguageFilter } from '../filters/language.filter';
import { LanguageService } from '../services/language.service';

@Controller('languages')
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService,
    private readonly languageFilter: LanguageFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getLanguagesQueryDto: GetLanguagesQueryDto) {
    const filter = this.languageFilter.findAll(getLanguagesQueryDto);
    const page = getLanguagesQueryDto._page;
    const limit = getLanguagesQueryDto._limit;

    return this.languageService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getLanguageParamDto: GetLanguageParamDto) {
    return this.languageService.findOne(getLanguageParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateLanguageParamDto: UpdateLanguageParamDto,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(
      updateLanguageParamDto.id,
      updateLanguageDto,
    );
  }
}
