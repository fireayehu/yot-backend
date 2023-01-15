import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from 'src/app/entities/job-category.entity';
import { JobCategoryController } from './controllers/job-category.controller';
import { JobCategoryFilter } from './filters/job-category.filter';
import { JobCategoryService } from './services/job-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategory])],
  controllers: [JobCategoryController],
  providers: [JobCategoryService, JobCategoryFilter],
})
export class JobCategoryModule {}
