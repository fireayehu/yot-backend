import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryFilter } from './filters/category.filter';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFilter],
})
export class CategoryModule {}
