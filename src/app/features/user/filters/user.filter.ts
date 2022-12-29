import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetUsersQueryDto } from '../dtos/get-users.dto';

@Injectable()
export class UserFilter {
  findAll(getUsersQueryDto: GetUsersQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {
      role: {
        type: {
          value: RoleType.USER,
        },
      },
    };

    for (const [key, value] of Object.entries(getUsersQueryDto)) {
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

    if (getUsersQueryDto._search) {
      filter = [
        {
          ...filter,
          email: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUsersQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          phoneNumber: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUsersQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          firstName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUsersQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          lastName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getUsersQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
