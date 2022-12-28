import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { In, Not } from 'typeorm';
import { GetRolesQueryDto } from '../dtos/get-roles.dto';

@Injectable()
export class RoleFilter {
  findAll(getRolesQueryDto: GetRolesQueryDto): IFilter | IFilter[] {
    let filter: IFilter = {
      type: {
        value: Not(
          In([RoleType.USER, RoleType.INSTRUCTOR, RoleType.SUPER_ADMIN]),
        ),
      },
    };

    for (const [key, value] of Object.entries(getRolesQueryDto)) {
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

    return filter;
  }
}
