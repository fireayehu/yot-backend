import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role extends Abstract {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => DataLookup)
  type: DataLookup;

  @OneToMany(() => RolePermission, (permission) => permission.role, {
    cascade: true,
  })
  permissions: RolePermission[];
}
