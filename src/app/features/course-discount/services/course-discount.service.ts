import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateCourseDiscountDto } from '../dtos/create-course-discount.dto';
import { UpdateCourseDiscountDto } from '../dtos/update-course-discount.dto';
import { CourseDiscount } from 'src/app/entities/course-discount.entitiy';

@Injectable()
export class CourseDiscountService {
  constructor(
    @InjectRepository(CourseDiscount)
    private readonly courseDiscountRepository: Repository<CourseDiscount>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [discounts, total] = await this.courseDiscountRepository.findAndCount(
      {
        relations: {
          state: true,
        },
        where: filter,
        take,
        skip,
      },
    );
    return {
      discounts,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const course = await this.courseDiscountRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!course) {
      throw new NotFoundException(
        `Course discount with id ${id} does not exist`,
      );
    }
    return {
      course,
    };
  }

  async create(createJobCategoryDto: CreateCourseDiscountDto) {
    const instance = this.courseDiscountRepository.create(createJobCategoryDto);

    const result = await this.courseDiscountRepository.save(instance);

    const course = await this.courseDiscountRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      course,
    };
  }

  async update(id: string, updateJobLocationDto: UpdateCourseDiscountDto) {
    const result = await this.courseDiscountRepository.update(
      id,
      updateJobLocationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Course discount with id ${id} does not exist`,
      );
    }

    const course = await this.courseDiscountRepository.findOne({
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
