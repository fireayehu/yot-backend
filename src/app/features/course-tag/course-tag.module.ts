import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseTag } from 'src/app/entities/course-tag.entitiy';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { CourseTagController } from './controllers/course-tag.controller';
import { CourseTagService } from './services/course-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseTag, DataLookup])],
  controllers: [CourseTagController],
  providers: [CourseTagService],
})
export class CourseTagModule {}
