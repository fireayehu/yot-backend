import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
@Index(['role', 'permission'], { unique: true })
export class RolePermission extends Abstract {
  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;

  @ManyToOne(() => Permission)
  permission: Permission;

  @Column({
    default: false,
  })
  granted: boolean;
}
