import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from 'src/app/entities/blog-category.entity';
import { BlogCategoryController } from './controllers/blog-category.controller';
import { BlogCategoryFilter } from './filters/blog-category.filter';
import { BlogCategoryService } from './services/blog-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory])],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService, BlogCategoryFilter],
})
export class BlogCategoryModule {}
