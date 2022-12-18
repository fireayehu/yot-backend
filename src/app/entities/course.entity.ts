import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DecimalTransformer } from '../shared/transformers/decimal.transformer';
import { Abstract } from './abstract.entity';
import { Category } from './category.entity';
import { CourseLanguage } from './course-language.entity';
import { CourseTag } from './course-tag.entitiy';
import { Prerequisite } from './prerequisite.entity';
import { Session } from './session.entity';
import { User } from './user.entity';

@Entity()
export class Course extends Abstract {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  duration: number;

  @Column({
    nullable: true,
  })
  preview: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  thumbnail: string;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  rating: number;

  @Column({
    default: 0,
  })
  totalReview: number;

  @Column({
    default: 0,
  })
  totalStudent: number;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  instructor: User;

  @OneToMany(() => CourseLanguage, (language) => language.course)
  languages: CourseLanguage[];

  @OneToMany(() => CourseTag, (tag) => tag.course)
  tags: CourseTag[];

  @OneToMany(() => Prerequisite, (prerequisite) => prerequisite.course)
  prerequisites: Prerequisite[];

  @OneToMany(() => Session, (session) => session.course)
  sessions: Session[];
}
