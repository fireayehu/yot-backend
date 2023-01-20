import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateBlogPostDto } from '../dtos/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dtos/update-blog-post.dto';
import { BlogPost } from 'src/app/entities/blog-post.entity';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [blogs, total] = await this.blogPostRepository.findAndCount({
      relations: {
        durationUnit: true,
        author: true,
        state: true,
      },
      where: filter,

      take,
      skip,
    });
    return {
      blogs,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const blog = await this.blogPostRepository.findOne({
      relations: {
        durationUnit: true,
        author: true,
        state: true,
      },
      where: {
        id,
      },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post with id ${id} does not exist`);
    }
    return {
      blog,
    };
  }

  async create(createBlogPostDto: CreateBlogPostDto) {
    const instance = this.blogPostRepository.create(createBlogPostDto);

    const result = await this.blogPostRepository.save(instance);

    const blog = await this.blogPostRepository.findOne({
      relations: { durationUnit: true, author: true, state: true },
      where: {
        id: result.id,
      },
    });

    return {
      blog,
    };
  }

  async update(id: string, updateJobLocationDto: UpdateBlogPostDto) {
    const result = await this.blogPostRepository.update(
      id,
      updateJobLocationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with id ${id} does not exist`);
    }

    const blog = await this.blogPostRepository.findOne({
      relations: {
        durationUnit: true,
        author: true,
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      blog,
    };
  }
}
