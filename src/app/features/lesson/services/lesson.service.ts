import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/app/entities/course.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Lesson } from 'src/app/entities/lesson.entity';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { UpdateLessonDto } from '../dtos/update-lesson.dto';
import { durationConverter } from '../helpers/duration-converter.helper';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [lessons, total] = await this.lessonRepository.findAndCount({
      relations: {
        durationUnit: true,
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      lessons,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepository.findOne({
      relations: {
        durationUnit: true,
        state: true,
      },
      where: {
        id,
      },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} does not exist`);
    }
    return {
      lesson,
    };
  }

  async create(createLessonDto: CreateLessonDto) {
    const order = await this.lessonRepository.count({
      where: {
        section: {
          id: createLessonDto.section as unknown as string,
        },
      },
    });
    const instance = this.lessonRepository.create({
      ...createLessonDto,
      order,
    });

    const result = await this.lessonRepository.save(instance);

    const lesson = await this.lessonRepository.findOne({
      relations: { durationUnit: true, state: true },
      where: {
        id: result.id,
      },
    });

    this.updateCourseDuration(
      result.id,
      createLessonDto.duration,
      createLessonDto.durationUnit as unknown as string,
    );

    return {
      lesson,
    };
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const previous = (await this.lessonRepository.findOne({
      relations: { durationUnit: true },
      where: { id },
    })) as Lesson;

    const result = await this.lessonRepository.update(id, updateLessonDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Lesson with id ${id} does not exist`);
    }

    const lesson = (await this.lessonRepository.findOne({
      relations: {
        durationUnit: true,
        state: true,
      },
      where: {
        id,
      },
    })) as Lesson;

    if (updateLessonDto.duration && updateLessonDto.durationUnit) {
      this.updateCourseDuration(
        lesson.id,
        updateLessonDto.duration,
        updateLessonDto.durationUnit as unknown as string,
        previous.duration,
        previous.durationUnit.value,
      );
    }

    return {
      lesson,
    };
  }

  async updateCourseDuration(
    lesson: string,
    duration: number,
    unit: string,
    prevDuration = 0,
    prevDurationUnit: string | null = null,
  ) {
    try {
      const durationUnit = (await this.dataLookupRepository.findOneBy({
        id: unit,
      })) as DataLookup;

      let previous = 0;
      if (prevDurationUnit) {
        previous = durationConverter(prevDuration, prevDurationUnit);
      }

      const course = await this.courseRepository.findOneBy({
        modules: {
          sections: {
            lessons: {
              id: lesson,
            },
          },
        },
      });

      if (course) {
        await this.courseRepository.update(course.id, {
          duration:
            course.duration -
            previous +
            durationConverter(duration, durationUnit.value),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
