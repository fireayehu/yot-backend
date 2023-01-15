import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateSubServiceDto } from '../dtos/create-sub-service.dto';
import { UpdateSubServiceDto } from '../dtos/update-sub-service.dto';
import { SubService } from 'src/app/entities/sub-service.entity';

@Injectable()
export class SubServiceService {
  constructor(
    @InjectRepository(SubService)
    private readonly subServiceRepository: Repository<SubService>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [subServices, total] = await this.subServiceRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      subServices,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const subService = await this.subServiceRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!subService) {
      throw new NotFoundException(`Sub Service with id ${id} does not exist`);
    }
    return {
      subService,
    };
  }

  async create(createSubServiceDto: CreateSubServiceDto) {
    const instance = this.subServiceRepository.create(createSubServiceDto);

    const result = await this.subServiceRepository.save(instance);

    const subService = await this.subServiceRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      subService,
    };
  }

  async update(id: string, updateSubServiceDto: UpdateSubServiceDto) {
    const result = await this.subServiceRepository.update(
      id,
      updateSubServiceDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Sub Service with id ${id} does not exist`);
    }

    const subService = await this.subServiceRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      subService,
    };
  }
}
