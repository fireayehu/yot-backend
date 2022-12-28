import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { RolePermission } from 'src/app/entities/role-permission.entity';
import { Role } from 'src/app/entities/role.entity';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,

    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [roles, total] = await this.roleRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      roles,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({
      relations: {
        state: true,
        permissions: {
          permission: true,
        },
      },
      where: {
        id,
      },
    });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} does not exist`);
    }
    return {
      role,
    };
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const type = (await this.dataLookupRepository.findOneBy({
        value: RoleType.CUSTOM,
      })) as DataLookup;

      const instance = this.roleRepository.create({
        ...createRoleDto,
        type,
      });

      const result = await this.roleRepository.save(instance);

      const role = await this.roleRepository.findOne({
        relations: { state: true },
        where: {
          id: result.id,
        },
      });

      return {
        role,
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('name')) {
          throw new ConflictException('Role name already exists');
        }
      }
      throw err;
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const result = await this.roleRepository.update(id, {
        name: updateRoleDto.name,
        description: updateRoleDto.description,
        state: updateRoleDto.state,
      });

      if (result.affected === 0) {
        throw new NotFoundException(`Role with id ${id} does not exist`);
      }

      if (updateRoleDto.permissions) {
        const permissions = updateRoleDto.permissions.map((permission) => ({
          role: id,
          permission: permission.permission,
          granted: permission.granted,
        })) as unknown as RolePermission;

        await this.rolePermissionRepository.upsert(permissions, {
          conflictPaths: ['role', 'permission'],
          skipUpdateIfNoValuesChanged: true,
        });
      }

      const role = await this.roleRepository.findOne({
        relations: {
          state: true,
          permissions: {
            permission: true,
          },
        },
        where: {
          id,
        },
      });

      return {
        role,
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('name')) {
          throw new ConflictException('Role name already exists');
        }
      }
      throw err;
    }
  }
}
