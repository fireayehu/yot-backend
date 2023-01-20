import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetSessionsQueryDto } from '../dtos/get-sessions.dto';

@Injectable()
export class SessionFilter {
  findAll(getSessionsQueryDto: GetSessionsQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getSessionsQueryDto)) {
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

    if (getSessionsQueryDto._search) {
      filter = [
        {
          ...filter,
          title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getSessionsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          description: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getSessionsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
