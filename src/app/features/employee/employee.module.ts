import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import { MailModule } from 'src/app/shared/mail/mail.module';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeFilter } from './filters/employee.filter';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeFilter],
})
export class EmployeeModule {}
