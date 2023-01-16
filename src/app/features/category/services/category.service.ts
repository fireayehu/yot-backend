import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from 'src/app/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      categories,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }
    return {
      category,
    };
  }

  async create(createTagDto: CreateCategoryDto) {
    const instance = this.categoryRepository.create(createTagDto);

    const result = await this.categoryRepository.save(instance);

    const category = await this.categoryRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      category,
    };
  }

  async update(id: string, updateTagDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateTagDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    const category = await this.categoryRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      category,
    };
  }
}
