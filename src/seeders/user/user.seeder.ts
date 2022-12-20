import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { parse } from 'csv-parse';

import { User } from '../../app/entities/user.entity';
import { Role } from '../../app/entities/role.entity';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const dataLookupRepository = dataSource.getRepository(Role);

    const roles = await dataLookupRepository.find({
      relations: { type: true },
      where: {},
    });

    const users: User[] = [];

    fs.createReadStream(path.join(__dirname, 'user.data.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, trim: true }))
      .on('data', (row: string[]) => {
        if (row[0]) {
          const role = roles.find((role) => role.type.value === row[4]);
          users.push(
            repository.create({
              firstName: row[0],
              lastName: row[1],
              email: row[2],
              password: bcrypt.hashSync(row[3], 10),
              role,
            }),
          );
        }
      })
      .on('end', async () => {
        await repository.upsert(users, {
          conflictPaths: ['email'],
          skipUpdateIfNoValuesChanged: true,
        });
      });
  }
}
