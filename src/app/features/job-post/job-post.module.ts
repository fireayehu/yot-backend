import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from 'src/app/entities/job-post.entity';
import { JobPostController } from './controllers/job-post.controller';
import { JobPostFilter } from './filters/job-post.filter';
import { JobPostService } from './services/job-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost])],
  controllers: [JobPostController],
  providers: [JobPostService, JobPostFilter],
})
export class JobPostModule {}
