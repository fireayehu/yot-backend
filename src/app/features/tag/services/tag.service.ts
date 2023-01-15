import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { Tag } from 'src/app/entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [tags, total] = await this.tagRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      tags,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} does not exist`);
    }
    return {
      tag,
    };
  }

  async create(createTagDto: CreateTagDto) {
    const instance = this.tagRepository.create(createTagDto);

    const result = await this.tagRepository.save(instance);

    const tag = await this.tagRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      tag,
    };
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const result = await this.tagRepository.update(id, updateTagDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Tag with id ${id} does not exist`);
    }

    const tag = await this.tagRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      tag,
    };
  }
}
