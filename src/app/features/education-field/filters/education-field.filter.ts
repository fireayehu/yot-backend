import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetEducationFieldsQueryDto } from '../dtos/get-education-fields.dto';

@Injectable()
export class EducationFieldFilter {
  findAll(
    getEducationFieldsQueryDto: GetEducationFieldsQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getEducationFieldsQueryDto)) {
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

    if (getEducationFieldsQueryDto._search) {
      filter = [
        {
          ...filter,
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEducationFieldsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
