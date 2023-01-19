import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateBlogCategoryDto } from '../dtos/create-blog-category.dto';
import { UpdateBlogCategoryDto } from '../dtos/update-blog-category.dto';
import { BlogCategory } from 'src/app/entities/blog-category.entity';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [categories, total] = await this.blogCategoryRepository.findAndCount({
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
    const category = await this.blogCategoryRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Blog category with id ${id} does not exist`);
    }
    return {
      category,
    };
  }

  async create(createBlogCategoryDto: CreateBlogCategoryDto) {
    const instance = this.blogCategoryRepository.create(createBlogCategoryDto);

    const result = await this.blogCategoryRepository.save(instance);

    const category = await this.blogCategoryRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      category,
    };
  }

  async update(id: string, updateBlogCategoryDto: UpdateBlogCategoryDto) {
    const result = await this.blogCategoryRepository.update(
      id,
      updateBlogCategoryDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Blog category with id ${id} does not exist`);
    }

    const category = await this.blogCategoryRepository.findOne({
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
