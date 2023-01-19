import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseLanguageDto } from '../dtos/create-course-language.dto';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ObjectState } from '../../data-lookup/enums/data-lookup.enum';
import { DeleteCourseLanguageDto } from '../dtos/delete-course-language.dto';
import { CourseLanguage } from 'src/app/entities/course-language.entity';

@Injectable()
export class CourseLanguageService {
  constructor(
    @InjectRepository(CourseLanguage)
    private readonly courseLanguageRepository: Repository<CourseLanguage>,

    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}

  async create(createCourseLanguageDto: CreateCourseLanguageDto) {
    try {
      const state = (await this.dataLookupRepository.findOneBy({
        value: ObjectState.ACTIVE,
      })) as DataLookup;

      const instance = this.courseLanguageRepository.create({
        ...createCourseLanguageDto,
        state,
      });

      const result = await this.courseLanguageRepository.save(instance);

      const courseLanguage = await this.courseLanguageRepository.findOne({
        relations: {
          course: true,
          language: true,
        },
        where: {
          id: result.id,
        },
      });

      return {
        courseLanguage,
      };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Language already assigned to course');
      }

      throw err;
    }
  }

  async delete(deleteCourseLanguageDto: DeleteCourseLanguageDto) {
    const result = await this.courseLanguageRepository.delete(
      deleteCourseLanguageDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Course language does not exist`);
    }

    return {
      courseLanguage: null,
    };
  }
}
