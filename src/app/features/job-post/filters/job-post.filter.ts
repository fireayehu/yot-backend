import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetJobPostsQueryDto } from '../dtos/get-job-posts.dto';

@Injectable()
export class JobPostFilter {
  findAll(getJobPostsQueryDto: GetJobPostsQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getJobPostsQueryDto)) {
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

    if (getJobPostsQueryDto._search) {
      filter = [
        {
          ...filter,
          title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getJobPostsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getJobPostsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
