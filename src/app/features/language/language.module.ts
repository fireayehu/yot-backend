import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/app/entities/language.entity';
import { LanguageController } from './controllers/language.controller';
import { LanguageFilter } from './filters/language.filter';
import { LanguageService } from './services/language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService, LanguageFilter],
})
export class LanguageModule {}
