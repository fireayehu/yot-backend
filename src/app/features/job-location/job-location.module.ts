import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLocation } from 'src/app/entities/job-location.entity';
import { JobLocationController } from './controllers/job-location.controller';
import { JobLocationFilter } from './filters/job-location.filter';
import { JobLocationService } from './services/job-location.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobLocation])],
  controllers: [JobLocationController],
  providers: [JobLocationService, JobLocationFilter],
})
export class JobLocationModule {}
