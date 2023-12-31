import {
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataLookup } from './data-lookup.entity';

export abstract class Abstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DataLookup)
  state: DataLookup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
