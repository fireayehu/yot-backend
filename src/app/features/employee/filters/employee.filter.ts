import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetEmployeesQueryDto } from '../dtos/get-employees.dto';

@Injectable()
export class EmployeeFilter {
  findAll(getEmployeesQueryDto: GetEmployeesQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {
      role: {
        type: {
          value: RoleType.CUSTOM,
        },
      },
    };

    for (const [key, value] of Object.entries(getEmployeesQueryDto)) {
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

    if (getEmployeesQueryDto._search) {
      filter = [
        {
          ...filter,
          email: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEmployeesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          phoneNumber: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEmployeesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          firstName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEmployeesQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          lastName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getEmployeesQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
