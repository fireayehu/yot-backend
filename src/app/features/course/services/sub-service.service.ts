import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from '../dtos/update-course.dto';
import { Course } from 'src/app/entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [courses, total] = await this.courseRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      courses,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} does not exist`);
    }
    return {
      course,
    };
  }

  async create(createCourseDto: CreateCourseDto) {
    const instance = this.courseRepository.create(createCourseDto);

    const result = await this.courseRepository.save(instance);

    const course = await this.courseRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      course,
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const result = await this.courseRepository.update(id, updateCourseDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Course with id ${id} does not exist`);
    }

    const course = await this.courseRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      course,
    };
  }
}
