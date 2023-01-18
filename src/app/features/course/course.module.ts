import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as MulterS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Course } from 'src/app/entities/course.entity';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/sub-service.service';
import { CourseFilter } from './filters/course.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const s3 = new S3Client({
          forcePathStyle: false,
          endpoint: configService.get<string>('S3_ENDPOINT'),
          region: configService.get<string>('S3_REGION'),
          credentials: {
            accessKeyId: configService.get<string>('S3_KEY') as string,
            secretAccessKey: configService.get<string>('S3_SECRET') as string,
          },
        });

        return {
          storage: MulterS3({
            s3: s3,
            acl: 'public-read',
            contentType: MulterS3.AUTO_CONTENT_TYPE,
            bucket: configService.get<string>('S3_BUCKET') as string,
            key: function (_, file, cb) {
              if (file.fieldname === 'image') {
                cb(
                  null,
                  `course-image/${uuidv4()}${path.extname(file.originalname)}`,
                );
              } else {
                cb(
                  null,
                  `course-preview/${uuidv4()}${path.extname(
                    file.originalname,
                  )}`,
                );
              }
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseFilter],
})
export class CourseModule {}
