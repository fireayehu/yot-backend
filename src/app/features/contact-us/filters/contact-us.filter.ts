import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Raw } from 'typeorm';
import { GetContactUsQueryDto } from '../dtos/get-contact-us.dto';

@Injectable()
export class ContactUsFilter {
  findAll(getContactUsQueryDto: GetContactUsQueryDto): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getContactUsQueryDto)) {
      if (['state', 'subService'].includes(key)) {
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

    if (getContactUsQueryDto._search) {
      filter = [
        {
          ...filter,
          email: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getContactUsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          phoneNumber: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getContactUsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          firstName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getContactUsQueryDto._search}%`,
          }),
        },
        {
          ...filter,
          lastName: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:query)`, {
            query: `%${getContactUsQueryDto._search}%`,
          }),
        },
      ];
    }

    return filter;
  }
}
