import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/app/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async findAll() {
    const [permissions, total] = await this.permissionRepository.findAndCount({
      relations: {
        resource: true,
      },
      where: {},
    });
    return {
      permissions,
      meta: {
        total,
      },
    };
  }
}
