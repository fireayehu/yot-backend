import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/app/entities/service.entity';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  async findAll(filter: IFilter | IFilter[]) {
    const [services, total] = await this.serviceRepository.findAndCount({
      where: filter,
    });
    return {
      services,
      meta: {
        total,
      },
    };
  }
}
