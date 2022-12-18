import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Resource } from '../../app/entities/resource.entity';
import { parse } from 'csv-parse';

export class ResourceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Resource);

    fs.createReadStream(path.join(__dirname, 'resource.data.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, trim: true }))
      .on('data', async (row: string[]) => {
        if (row[0]) {
          await repository.upsert(
            {
              name: row[0],
            },
            {
              conflictPaths: ['name'],
              skipUpdateIfNoValuesChanged: true,
            },
          );
        }
      });
  }
}
