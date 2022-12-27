import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { GetDataLookupsQueryDto } from '../dtos/get-data-lookups.dto';

@Injectable()
export class DataLookupFilter {
  findAll(getDataLookupsQueryDto: GetDataLookupsQueryDto): IFilter | IFilter[] {
    let filter: IFilter = {};

    for (const [key, value] of Object.entries(getDataLookupsQueryDto)) {
      filter = {
        ...filter,
        [key]: value,
      };
    }

    return filter;
  }
}
