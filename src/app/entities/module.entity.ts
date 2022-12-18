import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Course } from './course.entity';
import { Section } from './section.entity';

@Entity()
export class Module extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => Course)
  course: Course;

  @OneToMany(() => Section, (section) => section.module)
  sections: Section[];
}
