import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetInstructorsQueryDto } from '../dtos/get-instructors.dto';

@Injectable()
export class InstructorFilter {
  findAll(getInstructorsQueryDto: GetInstructorsQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {
      role: {
        type: {
          value: RoleType.INSTRUCTOR,
        },
      },
    };

    for (const [key, value] of Object.entries(getInstructorsQueryDto)) {
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

    if (getInstructorsQueryDto._search) {
      filter = [
        {
          ...filter,
          email: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getInstructorsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          phoneNumber: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getInstructorsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          firstName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getInstructorsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          lastName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getInstructorsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
