import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { DataLookup } from './data-lookup.entity';
import { JobCategory } from './job-category.entity';
import { JobLocation } from './job-location.entity';

@Entity()
export class JobPost extends Abstract {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  content: string;

  @ManyToOne(() => DataLookup)
  type: DataLookup;

  @ManyToOne(() => JobCategory)
  category: JobCategory;

  @ManyToOne(() => JobLocation)
  location: JobLocation;
}
