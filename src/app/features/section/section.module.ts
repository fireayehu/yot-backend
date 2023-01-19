import { Module as NestModlue } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/app/entities/section.entity';
import { SectionController } from './controllers/section.controller';
import { SectionFilter } from './filters/section.filter';
import { SectionService } from './services/section.service';

@NestModlue({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionController],
  providers: [SectionService, SectionFilter],
})
export class SectionModule {}
