import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { JobPost } from './job-post.entity';

@Entity()
export class JobApplication extends Abstract {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  resume: string;

  @ManyToOne(() => JobPost)
  job: JobPost;
}
