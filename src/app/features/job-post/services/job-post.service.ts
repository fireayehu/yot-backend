import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateJobPostDto } from '../dtos/create-job-post.dto';
import { UpdateJobPostDto } from '../dtos/update-job-post.dto';
import { JobPost } from 'src/app/entities/job-post.entity';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [posts, total] = await this.jobPostRepository.findAndCount({
      relations: {
        state: true,
        type: true,
        location: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      posts,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.jobPostRepository.findOne({
      relations: {
        state: true,
        type: true,
        location: true,
      },
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`Job post with id ${id} does not exist`);
    }
    return {
      post,
    };
  }

  async create(createJobCategoryDto: CreateJobPostDto) {
    const instance = this.jobPostRepository.create(createJobCategoryDto);

    const result = await this.jobPostRepository.save(instance);

    const post = await this.jobPostRepository.findOne({
      relations: { state: true, type: true, location: true },
      where: {
        id: result.id,
      },
    });

    return {
      post,
    };
  }

  async update(id: string, updateJobLocationDto: UpdateJobPostDto) {
    const result = await this.jobPostRepository.update(
      id,
      updateJobLocationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Job post with id ${id} does not exist`);
    }

    const post = await this.jobPostRepository.findOne({
      relations: {
        state: true,
        type: true,
        location: true,
      },
      where: {
        id,
      },
    });

    return {
      post,
    };
  }
}
