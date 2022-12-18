import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Lesson } from './lesson.entity';
import { Module } from './module.entity';

@Entity()
export class Section extends Abstract {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => Module)
  module: Module;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons: Lesson[];
}
