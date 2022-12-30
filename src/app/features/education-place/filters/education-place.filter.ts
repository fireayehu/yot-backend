import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetEducationPlacesQueryDto } from '../dtos/get-education-places.dto';

@Injectable()
export class EducationPlaceFilter {
  findAll(
    getEducationPlacesQueryDto: GetEducationPlacesQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getEducationPlacesQueryDto)) {
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

    if (getEducationPlacesQueryDto._search) {
      filter = [
        {
          ...filter,
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEducationPlacesQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
