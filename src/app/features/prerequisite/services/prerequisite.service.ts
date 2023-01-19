import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreatePrerequisiteDto } from '../dtos/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from '../dtos/update-prerequisitet.dto';
import { Prerequisite } from 'src/app/entities/prerequisite.entity';

@Injectable()
export class PrerequisiteService {
  constructor(
    @InjectRepository(Prerequisite)
    private readonly prerequisiteRepository: Repository<Prerequisite>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [prerequisites, total] =
      await this.prerequisiteRepository.findAndCount({
        relations: {
          state: true,
        },
        where: filter,
        take,
        skip,
      });
    return {
      prerequisites,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const prerequisite = await this.prerequisiteRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!prerequisite) {
      throw new NotFoundException(`Prerequisite with id ${id} does not exist`);
    }
    return {
      prerequisite,
    };
  }

  async create(createPrerequisiteDto: CreatePrerequisiteDto) {
    const order = await this.prerequisiteRepository.count({
      where: {
        course: {
          id: createPrerequisiteDto.course as unknown as string,
        },
      },
    });
    const instance = this.prerequisiteRepository.create({
      ...createPrerequisiteDto,
      order,
    });

    const result = await this.prerequisiteRepository.save(instance);

    const prerequisite = await this.prerequisiteRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      prerequisite,
    };
  }

  async update(id: string, updatePrerequisiteDto: UpdatePrerequisiteDto) {
    const result = await this.prerequisiteRepository.update(
      id,
      updatePrerequisiteDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Prerequisite with id ${id} does not exist`);
    }

    const prerequisite = await this.prerequisiteRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      prerequisite,
    };
  }
}
