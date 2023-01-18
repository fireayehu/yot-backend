import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from '../dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from '../dtos/update-job-application.dto';
import { JobApplication } from 'src/app/entities/job-application.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ObjectState } from '../../data-lookup/enums/data-lookup.enum';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,

    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [applications, total] =
      await this.jobApplicationRepository.findAndCount({
        where: filter,
        take,
        skip,
      });
    return {
      applications,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const application = await this.jobApplicationRepository.findOne({
      where: {
        id,
      },
    });
    if (!application) {
      throw new NotFoundException(
        `Job Application with id ${id} does not exist`,
      );
    }
    return {
      application,
    };
  }

  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const state = (await this.dataLookupRepository.findOneBy({
      value: ObjectState.ACTIVE,
    })) as DataLookup;
    const instance = this.jobApplicationRepository.create({
      ...createJobApplicationDto,
      state,
    });

    const result = await this.jobApplicationRepository.save(instance);

    const application = await this.jobApplicationRepository.findOne({
      where: {
        id: result.id,
      },
    });

    return {
      application,
    };
  }

  async update(id: string, updateJobApplicationDto: UpdateJobApplicationDto) {
    const result = await this.jobApplicationRepository.update(
      id,
      updateJobApplicationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Job Application with id ${id} does not exist`,
      );
    }

    const application = await this.jobApplicationRepository.findOne({
      where: {
        id,
      },
    });

    return {
      application,
    };
  }
}
