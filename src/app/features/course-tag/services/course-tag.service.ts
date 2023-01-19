import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseTagDto } from '../dtos/create-course-tag.dto';

import { CourseTag } from 'src/app/entities/course-tag.entitiy';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ObjectState } from '../../data-lookup/enums/data-lookup.enum';
import { DeleteCourseTagDto } from '../dtos/delete-course-tag.dto';

@Injectable()
export class CourseTagService {
  constructor(
    @InjectRepository(CourseTag)
    private readonly courseTagRepository: Repository<CourseTag>,

    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}

  async create(createCourseTagDto: CreateCourseTagDto) {
    try {
      const state = (await this.dataLookupRepository.findOneBy({
        value: ObjectState.ACTIVE,
      })) as DataLookup;

      const instance = this.courseTagRepository.create({
        ...createCourseTagDto,
        state,
      });

      const result = await this.courseTagRepository.save(instance);

      const courseTag = await this.courseTagRepository.findOne({
        relations: {
          course: true,
          tag: true,
        },
        where: {
          id: result.id,
        },
      });

      return {
        courseTag,
      };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Tag already assigned to course');
      }

      throw err;
    }
  }

  async delete(deleteCourseTagDto: DeleteCourseTagDto) {
    const result = await this.courseTagRepository.delete(deleteCourseTagDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Course tag does not exist`);
    }

    return {
      courseTag: null,
    };
  }
}
