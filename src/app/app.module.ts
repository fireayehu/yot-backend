import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/account/auth/auth.module';
import { PermissionModule } from './features/account/permission/permission.module';
import { RoleModule } from './features/account/role/role.module';
import { ContactUsModule } from './features/contact-us/contact-us.module';
import { DataLookupModule } from './features/data-lookup/data-lookup.module';
import { EducationFieldModule } from './features/education-field/education-field.module';
import { EducationLevelModule } from './features/education-level/education-level.module';
import { EducationPlaceModule } from './features/education-place/education-place.module';
import { InstructorModule } from './features/instructor/instructor.module';
import { JobCategoryModule } from './features/job-category/job-category.module';
import { JobLocationModule } from './features/job-location/job-location.module';
import { JobPostModule } from './features/job-post/job-post.module';
import { ServiceModule } from './features/service/service.module';
import { StaffModule } from './features/staff/staff.module';
import { SubServiceModule } from './features/sub-service/sub-service.module';
import { TagModule } from './features/tag/tag.module';
import { UserModule } from './features/user/user.module';
import { MailModule } from './shared/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [path.join(__dirname, './entities/*.{ts,js}')],
        migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
        synchronize: false,
        logging: false,
        ssl:
          configService.get('DB_ENV') === 'local'
            ? false
            : {
                rejectUnauthorized: false,
              },
      }),
      inject: [ConfigService],
    }),
    MailModule,
    AuthModule,
    DataLookupModule,
    PermissionModule,
    RoleModule,
    UserModule,
    StaffModule,
    InstructorModule,
    EducationPlaceModule,
    EducationFieldModule,
    EducationLevelModule,
    ContactUsModule,
    SubServiceModule,
    ServiceModule,
    JobLocationModule,
    JobCategoryModule,
    JobPostModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
