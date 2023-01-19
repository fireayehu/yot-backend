import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { GetModulesQueryDto } from '../dtos/get-modules.dto';

@Injectable()
export class ModuleFilter {
  findAll(getModulesQueryDto: GetModulesQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getModulesQueryDto)) {
      if (['state'].includes(key)) {
        filter = {
          ...filter,
          [key]: {
            id: value,
          },
        };
      } else if (!['_page', '_limit', '_search'].includes(key)) {
        filter = {
          ...filter,
          [key]: value,
        };
      }
    }

    return filter;
  }
}
