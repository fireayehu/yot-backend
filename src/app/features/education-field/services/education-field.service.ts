import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateEducationFieldDto } from '../dtos/create-education-field.dto';
import { UpdateEducationFieldDto } from '../dtos/update-education-field.dto';
import { EducationField } from 'src/app/entities/education-field.entity';

@Injectable()
export class EducationFieldService {
  constructor(
    @InjectRepository(EducationField)
    private readonly educationFieldRepository: Repository<EducationField>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [fields, total] = await this.educationFieldRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      fields,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const field = await this.educationFieldRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!field) {
      throw new NotFoundException(
        `Education field with id ${id} does not exist`,
      );
    }
    return {
      field,
    };
  }

  async create(createEducationFieldDto: CreateEducationFieldDto) {
    const instance = this.educationFieldRepository.create(
      createEducationFieldDto,
    );

    const result = await this.educationFieldRepository.save(instance);

    const field = await this.educationFieldRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      field,
    };
  }

  async update(id: string, updateEducationFieldDto: UpdateEducationFieldDto) {
    const result = await this.educationFieldRepository.update(
      id,
      updateEducationFieldDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Education field with id ${id} does not exist`,
      );
    }

    const field = await this.educationFieldRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      field,
    };
  }
}
