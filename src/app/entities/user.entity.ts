import { Entity, Column, Index, ManyToOne, OneToOne } from 'typeorm';
import { Abstract } from './abstract.entity';
import { Instructor } from './instructor.entity';
import { Role } from './role.entity';
import { Student } from './student.entity';

@Entity()
export class User extends Abstract {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  countryCode: string;

  @Column({
    nullable: true,
  })
  @Index({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  profilePicture: string;

  @Column({
    nullable: true,
  })
  passwordResetToken: string;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  passwordResetExpiresIn: Date;

  @ManyToOne(() => Role)
  role: Role;

  @OneToOne(() => Instructor, (instructor) => instructor.user, {
    cascade: true,
  })
  instructor: Instructor;

  @OneToOne(() => Student, (student) => student.user, {
    cascade: true,
  })
  student: Student;
}
