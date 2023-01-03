import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Resource } from '../../app/entities/resource.entity';
import { parse } from 'csv-parse';

export class ResourceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Resource);

    const resources: Resource[] = [];

    const parser = fs
      .createReadStream(path.join(__dirname, 'resource.data.csv'))
      .pipe(
        parse({
          delimiter: ',',
          from_line: 2,
          skip_empty_lines: true,
          trim: true,
        }),
      );

    for await (const row of parser) {
      resources.push(
        repository.create({
          name: row[0],
        }),
      );
    }
    await repository.upsert(resources, {
      conflictPaths: ['name'],
    });
  }
}
