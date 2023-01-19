import { Module as NestModlue } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/app/entities/course.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Lesson } from 'src/app/entities/lesson.entity';
import { LessonController } from './controllers/lesson.controller';
import { LessonFilter } from './filters/lesson.filter';
import { LessonService } from './services/lesson.service';

@NestModlue({
  imports: [TypeOrmModule.forFeature([Lesson, Course, DataLookup])],
  controllers: [LessonController],
  providers: [LessonService, LessonFilter],
})
export class LessonModule {}
