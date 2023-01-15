import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateJobCategoryDto } from '../dtos/create-job-category.dto';
import { UpdateJobCategoryDto } from '../dtos/update-job-category.dto';
import { JobCategory } from 'src/app/entities/job-category.entity';

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [categories, total] = await this.jobCategoryRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      categories,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const category = await this.jobCategoryRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Job category with id ${id} does not exist`);
    }
    return {
      category,
    };
  }

  async create(createJobCategoryDto: CreateJobCategoryDto) {
    const instance = this.jobCategoryRepository.create(createJobCategoryDto);

    const result = await this.jobCategoryRepository.save(instance);

    const category = await this.jobCategoryRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      category,
    };
  }

  async update(id: string, updateJobLocationDto: UpdateJobCategoryDto) {
    const result = await this.jobCategoryRepository.update(
      id,
      updateJobLocationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Job category with id ${id} does not exist`);
    }

    const category = await this.jobCategoryRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      category,
    };
  }
}
