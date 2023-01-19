import { Module as NestModlue } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/app/entities/module.entity';
import { ModuleController } from './controllers/module.controller';
import { ModuleFilter } from './filters/module.filter';
import { ModuleService } from './services/module.service';

@NestModlue({
  imports: [TypeOrmModule.forFeature([Module])],
  controllers: [ModuleController],
  providers: [ModuleService, ModuleFilter],
})
export class ModuleModule {}
