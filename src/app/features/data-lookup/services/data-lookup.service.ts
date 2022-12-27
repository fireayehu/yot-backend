import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';

@Injectable()
export class DataLookupService {
  constructor(
    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}
  async findAll(filter: IFilter | IFilter[]) {
    const [lookups, total] = await this.dataLookupRepository.findAndCount({
      where: filter,
    });
    return {
      lookups,
      meta: {
        total,
      },
    };
  }
}
