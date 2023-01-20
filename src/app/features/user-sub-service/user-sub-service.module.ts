import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubService } from 'src/app/entities/user-sub-service.entity';
import { UserSubServiceController } from './controllers/user-sub-service.controller';
import { UserSubServiceFilter } from './filters/user-sub-service.filter';
import { UserSubServiceService } from './services/user-sub-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubService])],
  controllers: [UserSubServiceController],
  providers: [UserSubServiceService, UserSubServiceFilter],
})
export class UserSubServiceModule {}
