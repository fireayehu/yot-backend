import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import { MailModule } from 'src/app/shared/mail/mail.module';
import { StaffController } from './controllers/staff.controller';
import { StaffFilter } from './filters/staff.filter';
import { StaffService } from './services/staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [StaffController],
  providers: [StaffService, StaffFilter],
})
export class StaffModule {}
