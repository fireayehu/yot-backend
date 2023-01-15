import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/app/entities/tag.entity';
import { TagController } from './controllers/tag.controller';
import { TagFilter } from './filters/tag.filter';
import { TagService } from './services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, TagFilter],
})
export class TagModule {}
