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
import { CreateTagDto } from '../dtos/create-tag.dto';
import { GetTagParamDto } from '../dtos/get-tag.dto';
import { GetTagsQueryDto } from '../dtos/get-tags.dto';
import { UpdateTagDto, UpdateTagParamDto } from '../dtos/update-tag.dto';
import { TagFilter } from '../filters/tag.filter';
import { TagService } from '../services/tag.service';

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly tagFilter: TagFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getTagsQueryDto: GetTagsQueryDto) {
    const filter = this.tagFilter.findAll(getTagsQueryDto);
    const page = getTagsQueryDto._page;
    const limit = getTagsQueryDto._limit;

    return this.tagService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getTagParamDto: GetTagParamDto) {
    return this.tagService.findOne(getTagParamDto.id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.TAG_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() updateTagParamDto: UpdateTagParamDto,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagService.update(updateTagParamDto.id, updateTagDto);
  }
}
