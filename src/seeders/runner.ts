import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { cleanEnv, port, str } from 'envalid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ResourceSeeder } from './resource/resource.seeder';
import { PermissionSeeder } from './permission/permission.seeder';
import { DataLookupSeeder } from './data-lookup/data-lookup.seeder';
import { RoleSeeder } from './role/role.seeder';
import { RolePermissionSeeder } from './role-permission/role-permission.seeder';
import { UserSeeder } from './user/user.seeder';

dotenv.config({
  path: '.env.migration',
});

const env = cleanEnv(process.env, {
  DATABASE_NAME: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: port(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
});

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: +env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [path.join(__dirname, '../app/entities/*.ts')],
    seeds: [
      DataLookupSeeder,
      ResourceSeeder,
      PermissionSeeder,
      RoleSeeder,
      RolePermissionSeeder,
      UserSeeder,
    ],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
