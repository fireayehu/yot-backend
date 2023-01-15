import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUs } from 'src/app/entities/contact-us.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ContactUsController } from './controllers/contact-us.controller';
import { ContactUsFilter } from './filters/contact-us.filter';
import { ContactUsService } from './services/contact-us.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUs, DataLookup])],
  controllers: [ContactUsController],
  providers: [ContactUsService, ContactUsFilter],
})
export class ContactUsModule {}
