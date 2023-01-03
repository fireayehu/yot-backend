import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { parse } from 'csv-parse';

import { User } from '../../app/entities/user.entity';
import { Role } from '../../app/entities/role.entity';
import { DataLookup } from '../../app/entities/data-lookup.entity';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const dataLookupRepository = dataSource.getRepository(DataLookup);

    const roles = await roleRepository.find({
      relations: { type: true },
      where: {},
    });

    const state = (await dataLookupRepository.findOneBy({
      value: 'object_state_active',
    })) as DataLookup;

    const users: User[] = [];

    const parser = fs
      .createReadStream(path.join(__dirname, 'user.data.csv'))
      .pipe(
        parse({
          delimiter: ',',
          from_line: 2,
          skip_empty_lines: true,
          trim: true,
        }),
      );

    for await (const row of parser) {
      const role = roles.find((role) => role.type.value === row[4]);
      users.push(
        repository.create({
          firstName: row[0],
          lastName: row[1],
          email: row[2],
          password: bcrypt.hashSync(row[3], 10),
          role,
          state,
        }),
      );
    }
    await repository.upsert(users, {
      conflictPaths: ['email'],
    });
  }
}
