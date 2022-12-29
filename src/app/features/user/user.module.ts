import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserFilter } from './filters/user.filter';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService, UserFilter],
})
export class UserModule {}
