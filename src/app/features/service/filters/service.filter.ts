import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { GetServicesQueryDto } from '../dtos/get-services.dto';

@Injectable()
export class ServiceFilter {
  findAll(getServicesQueryDto: GetServicesQueryDto): IFilter | IFilter[] {
    let filter: IFilter = {};

    for (const [key, value] of Object.entries(getServicesQueryDto)) {
      if (['state', 'type'].includes(key)) {
        filter = {
          ...filter,
          [key]: {
            id: value,
          },
        };
      }
    }

    return filter;
  }
}
