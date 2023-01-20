import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/category.entity';
import { Session } from 'src/app/entities/session.entity';
import { SessionController } from './controllers/session.controller';
import { SessionFilter } from './filters/session.filter';
import { SessionService } from './services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [SessionService, SessionFilter],
})
export class SessionModule {}
