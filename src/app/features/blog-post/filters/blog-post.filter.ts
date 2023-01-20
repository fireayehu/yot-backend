import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetBlogPostsQueryDto } from '../dtos/get-blog-posts.dto';

@Injectable()
export class BlogPostFilter {
  findAll(getBlogPostsQueryDto: GetBlogPostsQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getBlogPostsQueryDto)) {
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

    if (getBlogPostsQueryDto._search) {
      filter = [
        {
          ...filter,
          title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getBlogPostsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getBlogPostsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
