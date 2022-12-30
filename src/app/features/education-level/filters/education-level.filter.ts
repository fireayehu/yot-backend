import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetEducationLevelsQueryDto } from '../dtos/get-education-levels.dto';

@Injectable()
export class EducationLevelFilter {
  findAll(
    getEducationLevelsQueryDto: GetEducationLevelsQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getEducationLevelsQueryDto)) {
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

    if (getEducationLevelsQueryDto._search) {
      filter = [
        {
          ...filter,
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEducationLevelsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          shortCode: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEducationLevelsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
