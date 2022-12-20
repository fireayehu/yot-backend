import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Role } from '../../app/entities/role.entity';
import { DataLookup } from '../../app/entities/data-lookup.entity';

export class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);
    const dataLookupRepository = dataSource.getRepository(DataLookup);

    const types = await dataLookupRepository.findBy({
      type: 'role_type',
    });

    const roles: Role[] = [];

    fs.createReadStream(path.join(__dirname, 'role.data.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, trim: true }))
      .on('data', (row: string[]) => {
        if (row[0]) {
          const type = types.find((type) => type.value === row[1]);
          roles.push(
            repository.create({
              name: row[0],
              type,
              description: row[2],
            }),
          );
        }
      })
      .on('end', async () => {
        await repository.upsert(roles, {
          conflictPaths: ['name'],
          skipUpdateIfNoValuesChanged: true,
        });
      });
  }
}
