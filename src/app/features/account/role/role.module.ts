import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { RolePermission } from 'src/app/entities/role-permission.entity';
import { Role } from 'src/app/entities/role.entity';
import { RoleController } from './controllers/role.controller';
import { RoleFilter } from './filters/role.filter';
import { RoleService } from './services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission, DataLookup])],
  controllers: [RoleController],
  providers: [RoleService, RoleFilter],
})
export class RoleModule {}
