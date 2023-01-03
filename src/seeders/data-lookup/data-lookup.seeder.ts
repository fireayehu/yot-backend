import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { DataLookup } from '../../app/entities/data-lookup.entity';

export class DataLookupSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(DataLookup);

    const datalookups: DataLookup[] = [];

    const parser = fs
      .createReadStream(path.join(__dirname, 'data-lookup.data.csv'))
      .pipe(
        parse({
          delimiter: ',',
          from_line: 2,
          skip_empty_lines: true,
          trim: true,
        }),
      );

    for await (const row of parser) {
      datalookups.push(
        repository.create({
          type: row[0],
          value: row[1],
          category: row[2],
        }),
      );
    }

    await repository.upsert(datalookups, {
      conflictPaths: ['value'],
    });
  }
}
