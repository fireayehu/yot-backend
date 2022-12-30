import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationLevel } from 'src/app/entities/education-level.entity';
import { EducationLevelController } from './controllers/education-level.controller';
import { EducationLevelFilter } from './filters/education-level.filter';
import { EducationLevelService } from './services/education-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([EducationLevel])],
  controllers: [EducationLevelController],
  providers: [EducationLevelService, EducationLevelFilter],
})
export class EducationLevelModule {}
