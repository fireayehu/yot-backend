import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateJobLocationDto } from '../dtos/create-job-location.dto';
import { UpdateJobLocationDto } from '../dtos/update-job-location.dto';
import { JobLocation } from 'src/app/entities/job-location.entity';

@Injectable()
export class JobLocationService {
  constructor(
    @InjectRepository(JobLocation)
    private readonly jobLocationRepository: Repository<JobLocation>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [locations, total] = await this.jobLocationRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      locations,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const location = await this.jobLocationRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!location) {
      throw new NotFoundException(`Job location with id ${id} does not exist`);
    }
    return {
      location,
    };
  }

  async create(createJobLocationDto: CreateJobLocationDto) {
    const instance = this.jobLocationRepository.create(createJobLocationDto);

    const result = await this.jobLocationRepository.save(instance);

    const location = await this.jobLocationRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      location,
    };
  }

  async update(id: string, updateJobLocationDto: UpdateJobLocationDto) {
    const result = await this.jobLocationRepository.update(
      id,
      updateJobLocationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Job location with id ${id} does not exist`);
    }

    const location = await this.jobLocationRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      location,
    };
  }
}
