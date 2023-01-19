import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateSectionDto } from '../dtos/create-section.dto';
import { UpdateSectionDto } from '../dtos/update-section.dto';
import { Section } from 'src/app/entities/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [sections, total] = await this.sectionRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      sections,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const section = await this.sectionRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!section) {
      throw new NotFoundException(`Section with id ${id} does not exist`);
    }
    return {
      section,
    };
  }

  async create(createSectionDto: CreateSectionDto) {
    const order = await this.sectionRepository.count({
      where: {
        module: {
          id: createSectionDto.module as unknown as string,
        },
      },
    });
    const instance = this.sectionRepository.create({
      ...createSectionDto,
      order,
    });

    const result = await this.sectionRepository.save(instance);

    const section = await this.sectionRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      section,
    };
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const result = await this.sectionRepository.update(id, updateSectionDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Section with id ${id} does not exist`);
    }

    const section = await this.sectionRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      section,
    };
  }
}
