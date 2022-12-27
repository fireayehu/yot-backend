import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { DataLookupController } from './controllers/data-lookup.controller';
import { DataLookupFilter } from './filters/data-lookup.filter';
import { DataLookupService } from './services/data-lookup.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataLookup])],
  controllers: [DataLookupController],
  providers: [DataLookupService, DataLookupFilter],
})
export class DataLookupModule {}
