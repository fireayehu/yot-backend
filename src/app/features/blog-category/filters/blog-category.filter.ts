import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetBlogCategoriesQueryDto } from '../dtos/get-blog-categories.dto';

@Injectable()
export class BlogCategoryFilter {
  findAll(
    getBlogCategoriesQueryDto: GetBlogCategoriesQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getBlogCategoriesQueryDto)) {
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

    if (getBlogCategoriesQueryDto._search) {
      filter = [
        {
          ...filter,
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getBlogCategoriesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getBlogCategoriesQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
