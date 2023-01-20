import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from 'src/app/entities/blog-post.entity';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogPostFilter } from './filters/blog-post.filter';
import { BlogPostService } from './services/blog-post.service';
import * as MulterS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
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
              cb(
                null,
                `blog-image/${uuidv4()}${path.extname(file.originalname)}`,
              );
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostFilter],
})
export class BlogPostModule {}
