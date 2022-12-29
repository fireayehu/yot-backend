import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Permission } from '../../app/entities/permission.entity';
import { Resource } from '../../app/entities/resource.entity';

export class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Permission);
    const resourceRepository = dataSource.getRepository(Resource);

    const permissions: Permission[] = [];
    const resources = await resourceRepository.find();

    fs.createReadStream(path.join(__dirname, 'permission.data.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, trim: true }))
      .on('data', (row: string[]) => {
        if (row[0]) {
          const resource = resources.find(
            (resource) => resource.name === row[2],
          );

          if (resource) {
            permissions.push(
              repository.create({
                name: row[0],
                code: row[1],
                resource,
              }),
            );
          }
        }
      })
      .on('end', async () => {
        await repository.upsert(permissions, {
          conflictPaths: ['code'],
          skipUpdateIfNoValuesChanged: true,
        });
      });
  }
}
