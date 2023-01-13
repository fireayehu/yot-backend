import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';

import { DataLookup } from '../../app/entities/data-lookup.entity';
import { Service } from '../../app/entities/service.entity';

export class ServiceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Service);
    const dataLookupRepository = dataSource.getRepository(DataLookup);

    const state = (await dataLookupRepository.findOneBy({
      value: 'object_state_active',
    })) as DataLookup;

    const types = await dataLookupRepository.find({
      where: {
        type: 'service_type',
      },
    });

    const services: Service[] = [];

    const parser = fs
      .createReadStream(path.join(__dirname, 'service.data.csv'))
      .pipe(
        parse({
          delimiter: ',',
          from_line: 2,
          skip_empty_lines: true,
          trim: true,
        }),
      );

    for await (const row of parser) {
      const type = types.find((type) => type.value === row[2]);
      services.push(
        repository.create({
          name: row[0],
          description: row[1],
          type,
          state,
        }),
      );
    }
    await repository.upsert(services, {
      conflictPaths: ['name'],
    });
  }
}
