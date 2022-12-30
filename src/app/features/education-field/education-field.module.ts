import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationField } from 'src/app/entities/education-field.entity';
import { EducationFieldController } from './controllers/education-field.controller';
import { EducationFieldFilter } from './filters/education-field.filter';
import { EducationFieldService } from './services/education-field.service';

@Module({
  imports: [TypeOrmModule.forFeature([EducationField])],
  controllers: [EducationFieldController],
  providers: [EducationFieldService, EducationFieldFilter],
})
export class EducationFieldModule {}
