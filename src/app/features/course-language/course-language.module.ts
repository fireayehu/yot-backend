import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseLanguage } from 'src/app/entities/course-language.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { CourseLanguageController } from './controllers/course-language.controller';
import { CourseLanguageService } from './services/course-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseLanguage, DataLookup])],
  controllers: [CourseLanguageController],
  providers: [CourseLanguageService],
})
export class CourseLanguageModule {}
