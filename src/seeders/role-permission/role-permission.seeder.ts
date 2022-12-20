import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Permission } from '../../app/entities/permission.entity';
import { RolePermission } from '../../app/entities/role-permission.entity';
import { Role } from '../../app/entities/role.entity';

export class RolePermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RolePermission);
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    const rolePermissions: RolePermission[] = [];
    const permissions = await permissionRepository.find();

    const superadmin = (await roleRepository.findOneBy({
      type: {
        value: 'role_type_superadmin',
      },
    })) as unknown as Role;

    const instructor = (await roleRepository.findOneBy({
      type: {
        value: 'role_type_instructor',
      },
    })) as unknown as Role;
    const user = (await roleRepository.findOneBy({
      type: {
        value: 'role_type_user',
      },
    })) as unknown as Role;

    fs.createReadStream(path.join(__dirname, 'role-permission.data.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, trim: true }))
      .on('data', (row: string[]) => {
        if (row[0]) {
          const permission = permissions.find(
            (permission) => permission.code === row[0],
          );

          rolePermissions.push(
            repository.create({
              role: superadmin,
              permission,
              granted: row[1] === 'Y',
            }),
          );

          rolePermissions.push(
            repository.create({
              role: user,
              permission,
              granted: row[2] === 'Y',
            }),
          );

          rolePermissions.push(
            repository.create({
              role: instructor,
              permission,
              granted: row[3] === 'Y',
            }),
          );
        }
      })
      .on('end', async () => {
        await repository.upsert(rolePermissions, {
          conflictPaths: ['role', 'permission'],
          skipUpdateIfNoValuesChanged: true,
        });
      });
  }
}
