import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetUserSubServicesQueryDto } from '../dtos/get-user-sub-services.dto';

@Injectable()
export class UserSubServiceFilter {
  findAll(
    getUserSubServicesQueryDto: GetUserSubServicesQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getUserSubServicesQueryDto)) {
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

    if (getUserSubServicesQueryDto._search) {
      filter = [
        {
          ...filter,
          title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUserSubServicesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUserSubServicesQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
