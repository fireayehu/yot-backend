import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateContactUsDto } from '../dtos/create-contact-us.dto';
import {
  GetContactUsParamDto,
  GetContactUsQueryDto,
} from '../dtos/get-contact-us.dto';
import { ContactUsFilter } from '../filters/contact-us.filter';
import { ContactUsService } from '../services/contact-us.service';

@Controller('contact-us')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly contactUsFilter: ContactUsFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CONTACT_US_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getContactUsQueryDto: GetContactUsQueryDto) {
    const filter = this.contactUsFilter.findAll(getContactUsQueryDto);
    const page = getContactUsQueryDto._page;
    const limit = getContactUsQueryDto._limit;

    return this.contactUsService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.CONTACT_US_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getContactUsParamDto: GetContactUsParamDto) {
    return this.contactUsService.findOne(getContactUsParamDto.id);
  }

  @Post()
  async create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }
}
