import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as MulterS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, DataLookup]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
