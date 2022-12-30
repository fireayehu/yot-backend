import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateEducationPlaceDto } from '../dtos/create-education-place.dto';
import { UpdateEducationPlaceDto } from '../dtos/update-education-place.dto';
import { EducationPlace } from 'src/app/entities/education-place.entity';

@Injectable()
export class EducationPlaceService {
  constructor(
    @InjectRepository(EducationPlace)
    private readonly educationPlaceRepository: Repository<EducationPlace>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [places, total] = await this.educationPlaceRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      places,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const place = await this.educationPlaceRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!place) {
      throw new NotFoundException(
        `Education place with id ${id} does not exist`,
      );
    }
    return {
      place,
    };
  }

  async create(createEducationPlaceDto: CreateEducationPlaceDto) {
    const instance = this.educationPlaceRepository.create(
      createEducationPlaceDto,
    );

    const result = await this.educationPlaceRepository.save(instance);

    const place = await this.educationPlaceRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      place,
    };
  }

  async update(id: string, updateEducationPlaceDto: UpdateEducationPlaceDto) {
    const result = await this.educationPlaceRepository.update(
      id,
      updateEducationPlaceDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Education place with id ${id} does not exist`,
      );
    }

    const place = await this.educationPlaceRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      place,
    };
  }
}
