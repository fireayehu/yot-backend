import { DataSource } from 'typeorm';
import { cleanEnv, port, str } from 'envalid';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.migration',
});

const env = cleanEnv(process.env, {
  DATABASE_NAME: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: port(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DB_ENV: str(),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  ssl:
    env.DB_ENV === 'local'
      ? false
      : {
          rejectUnauthorized: false,
        },
  entities: [path.join(__dirname, '../entities/*.{ts,js}')],
  migrations: [path.join(__dirname, '../../migrations/*.{ts,js}')],
});
