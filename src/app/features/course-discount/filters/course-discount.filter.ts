import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { GetCourseDiscountsQueryDto } from '../dtos/get-course-discounts.dto';

@Injectable()
export class CourseDiscountFilter {
  findAll(
    getCourseDiscountsQueryDto: GetCourseDiscountsQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getCourseDiscountsQueryDto)) {
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
