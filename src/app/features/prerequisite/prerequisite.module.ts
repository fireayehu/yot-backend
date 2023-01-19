import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisite } from 'src/app/entities/prerequisite.entity';
import { PrerequisiteController } from './controllers/prerequisite.controller';
import { PrerequisiteFilter } from './filters/prerequisite.filter';
import { PrerequisiteService } from './services/prerequisite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisite])],
  controllers: [PrerequisiteController],
  providers: [PrerequisiteService, PrerequisiteFilter],
})
export class PrerequisiteModule {}
