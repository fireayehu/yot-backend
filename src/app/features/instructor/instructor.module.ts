import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { InstructorController } from './controllers/instructor.controller';
import { InstructorFilter } from './filters/instructor.filter';
import { InstructorService } from './services/instructor.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [InstructorController],
  providers: [InstructorService, InstructorFilter],
})
export class InstructorModule {}
