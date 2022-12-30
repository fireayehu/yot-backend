import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateEducationLevelDto } from '../dtos/create-education-level.dto';
import { UpdateEducationLevelDto } from '../dtos/update-education-level.dto';
import { EducationLevel } from 'src/app/entities/education-level.entity';

@Injectable()
export class EducationLevelService {
  constructor(
    @InjectRepository(EducationLevel)
    private readonly educationLevelRepository: Repository<EducationLevel>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [levels, total] = await this.educationLevelRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      levels,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const level = await this.educationLevelRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!level) {
      throw new NotFoundException(
        `Education level with id ${id} does not exist`,
      );
    }
    return {
      level,
    };
  }

  async create(createEducationLevelDto: CreateEducationLevelDto) {
    const instance = this.educationLevelRepository.create(
      createEducationLevelDto,
    );

    const result = await this.educationLevelRepository.save(instance);

    const level = await this.educationLevelRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      level,
    };
  }

  async update(id: string, updateEducationLevelDto: UpdateEducationLevelDto) {
    const result = await this.educationLevelRepository.update(
      id,
      updateEducationLevelDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Education level with id ${id} does not exist`,
      );
    }

    const level = await this.educationLevelRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      level,
    };
  }
}
