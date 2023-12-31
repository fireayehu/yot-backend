import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/account/auth/auth.module';
import { PermissionModule } from './features/account/permission/permission.module';
import { RoleModule } from './features/account/role/role.module';
import { BlogCategoryModule } from './features/blog-category/blog-category.module';
import { BlogPostModule } from './features/blog-post/blog-post.module';
import { CategoryModule } from './features/category/category.module';
import { ContactUsModule } from './features/contact-us/contact-us.module';
import { CourseDiscountModule } from './features/course-discount/course-discount.module';
import { CourseLanguageModule } from './features/course-language/course-language.module';
import { CourseTagModule } from './features/course-tag/course-tag.module';
import { CourseModule } from './features/course/course.module';
import { DataLookupModule } from './features/data-lookup/data-lookup.module';
import { EducationFieldModule } from './features/education-field/education-field.module';
import { EducationLevelModule } from './features/education-level/education-level.module';
import { EducationPlaceModule } from './features/education-place/education-place.module';
import { InstructorModule } from './features/instructor/instructor.module';
import { JobApplicationModule } from './features/job-application/job-application.module';
import { JobCategoryModule } from './features/job-category/job-category.module';
import { JobLocationModule } from './features/job-location/job-location.module';
import { JobPostModule } from './features/job-post/job-post.module';
import { LanguageModule } from './features/language/language.module';
import { LessonModule } from './features/lesson/lesson.module';
import { ModuleModule } from './features/module/module.module';
import { PrerequisiteModule } from './features/prerequisite/prerequisite.module';
import { SectionModule } from './features/section/section.module';
import { ServiceModule } from './features/service/service.module';
import { SessionModule } from './features/session/session.module';
import { StaffModule } from './features/staff/staff.module';
import { SubServiceModule } from './features/sub-service/sub-service.module';
import { TagModule } from './features/tag/tag.module';
import { UserSubServiceModule } from './features/user-sub-service/user-sub-service.module';
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
    JobApplicationModule,
    TagModule,
    CategoryModule,
    LanguageModule,
    CourseModule,
    CourseDiscountModule,
    CourseTagModule,
    CourseLanguageModule,
    PrerequisiteModule,
    ModuleModule,
    SectionModule,
    LessonModule,
    BlogCategoryModule,
    BlogPostModule,
    UserSubServiceModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
