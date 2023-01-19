import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDiscount } from 'src/app/entities/course-discount.entitiy';
import { CourseDiscountController } from './controllers/job-post.controller';
import { CourseDiscountFilter } from './filters/course-discount.filter';
import { CourseDiscountService } from './services/course-discount.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDiscount])],
  controllers: [CourseDiscountController],
  providers: [CourseDiscountService, CourseDiscountFilter],
})
export class CourseDiscountModule {}
