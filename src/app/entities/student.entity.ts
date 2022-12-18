import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { User } from './user.entity';

@Entity()
export class Student extends Abstract {
  @Column()
  code: string;

  @OneToOne(() => User, (user) => user.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
