import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetCategoriesQueryDto } from '../dtos/get-categories.dto';

@Injectable()
export class CategoryFilter {
  findAll(getCategoriesQueryDto: GetCategoriesQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getCategoriesQueryDto)) {
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

    if (getCategoriesQueryDto._search) {
      filter = [
        {
          ...filter,
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getCategoriesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getCategoriesQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
