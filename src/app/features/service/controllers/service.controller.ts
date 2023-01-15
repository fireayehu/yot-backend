import { Controller, Get, Query } from '@nestjs/common';

import { GetServicesQueryDto } from '../dtos/get-services.dto';
import { ServiceFilter } from '../filters/service.filter';
import { ServiceService } from '../services/service.service';

@Controller('services')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly serviceFilter: ServiceFilter,
  ) {}

  @Get()
  async findAll(@Query() getServicesQueryDto: GetServicesQueryDto) {
    const filter = this.serviceFilter.findAll(getServicesQueryDto);

    return this.serviceService.findAll(filter);
  }
}
