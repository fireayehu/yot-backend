import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationPlace } from 'src/app/entities/education-place.entity';
import { EducationPlaceController } from './controllers/education-place.controller';
import { EducationPlaceFilter } from './filters/education-place.filter';
import { EducationPlaceService } from './services/education-place.service';

@Module({
  imports: [TypeOrmModule.forFeature([EducationPlace])],
  controllers: [EducationPlaceController],
  providers: [EducationPlaceService, EducationPlaceFilter],
})
export class EducationPlaceModule {}
