import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { MailModule } from 'src/app/shared/mail/mail.module';
import { InstructorController } from './controllers/instructor.controller';
import { InstructorFilter } from './filters/instructor.filter';
import { InstructorService } from './services/instructor.service';
import * as MulterS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
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
              cb(null, `profile/${uuidv4()}${path.extname(file.originalname)}`);
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
    MailModule,
  ],
  controllers: [InstructorController],
  providers: [InstructorService, InstructorFilter],
})
export class InstructorModule {}
