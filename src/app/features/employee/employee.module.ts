import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeFilter } from './filters/employee.filter';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeFilter],
})
export class EmployeeModule {}
