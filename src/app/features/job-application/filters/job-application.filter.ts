import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';

import { GetJobApplicationsQueryDto } from '../dtos/get-job-applications.dto';

@Injectable()
export class JobApplicationFilter {
  findAll(
    getJobApplicationsQueryDto: GetJobApplicationsQueryDto,
  ): IFilter | IFilter[] {
    let filter: IFilter | IFilter[] = {};

    for (const [key, value] of Object.entries(getJobApplicationsQueryDto)) {
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
