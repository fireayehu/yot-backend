import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/app/entities/service.entity';
import { ServiceController } from './controllers/service.controller';
import { ServiceFilter } from './filters/service.filter';
import { ServiceService } from './services/service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceFilter],
})
export class ServiceModule {}
