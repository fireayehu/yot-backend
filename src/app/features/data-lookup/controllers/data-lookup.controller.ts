import { Controller, Get, Query } from '@nestjs/common';

import { GetDataLookupsQueryDto } from '../dtos/get-data-lookups.dto';
import { DataLookupFilter } from '../filters/data-lookup.filter';
import { DataLookupService } from '../services/data-lookup.service';

@Controller('data-lookups')
export class DataLookupController {
  constructor(
    private readonly dataLookupService: DataLookupService,
    private readonly dataLookupFilter: DataLookupFilter,
  ) {}

  @Get()
  async findAll(@Query() getDataLookupsQueryDto: GetDataLookupsQueryDto) {
    const filter = this.dataLookupFilter.findAll(getDataLookupsQueryDto);

    return this.dataLookupService.findAll(filter);
  }
}
