import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { UpdateModuleDto } from '../dtos/update-module.dto';
import { Module } from 'src/app/entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [modules, total] = await this.moduleRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      modules,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const module = await this.moduleRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!module) {
      throw new NotFoundException(`Module with id ${id} does not exist`);
    }
    return {
      module,
    };
  }

  async create(createModuleDto: CreateModuleDto) {
    const order = await this.moduleRepository.count({
      where: {
        course: {
          id: createModuleDto.course as unknown as string,
        },
      },
    });
    const instance = this.moduleRepository.create({
      ...createModuleDto,
      order,
    });

    const result = await this.moduleRepository.save(instance);

    const module = await this.moduleRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      module,
    };
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const result = await this.moduleRepository.update(id, updateModuleDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Module with id ${id} does not exist`);
    }

    const module = await this.moduleRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      module,
    };
  }
}
