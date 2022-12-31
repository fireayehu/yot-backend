import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/app/entities/role.entity';
import { User } from 'src/app/entities/user.entity';
import { RoleType } from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { UpdateInstructorDto } from '../dtos/update-instructor.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/app/shared/mail/services/mail.service';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [instructors, total] = await this.userRepository.findAndCount({
      relations: {
        instructor: {
          educationPlace: true,
          educationField: true,
          educationLevel: true,
        },
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      instructors,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const instructor = await this.userRepository.findOne({
      relations: {
        instructor: {
          educationPlace: true,
          educationField: true,
          educationLevel: true,
        },
        state: true,
      },
      where: {
        id,
      },
    });
    if (!instructor) {
      throw new NotFoundException(`Instructor with id ${id} does not exist`);
    }
    return {
      instructor,
    };
  }

  async create(createInstructorDto: CreateInstructorDto) {
    try {
      const role = (await this.roleRepository.findOneBy({
        type: {
          value: RoleType.INSTRUCTOR,
        },
      })) as Role;
      const nanoid = customAlphabet(alphanumeric, 8);

      const random = (await nanoid()).toUpperCase();

      const password = await bcrypt.hash(random, 10);

      const instance = this.userRepository.create({
        ...createInstructorDto,
        role,
        password,
      });

      const result = await this.userRepository.save(instance);

      const instructor = (await this.userRepository.findOne({
        relations: {
          instructor: {
            educationPlace: true,
            educationField: true,
            educationLevel: true,
          },
          state: true,
        },
        where: {
          id: result.id,
        },
      })) as unknown as User;

      this.mailService.sendPasswordEmail({
        to: instructor.email,
        name: `${instructor.firstName} ${instructor.lastName}`,
        password: random,
        link: this.configService.get<string>('INSTRUCTOR_LOGIN_URL') as string,
      });

      return {
        instructor,
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('email')) {
          throw new ConflictException('Email address already exists');
        } else if (err.detail.includes('phoneNumber')) {
          throw new ConflictException('Phone number already exists');
        }
      }
      throw err;
    }
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    try {
      const exists = await this.userRepository.findOneBy({ id });

      if (!exists) {
        throw new NotFoundException(`Instructor with id ${id} does not exist`);
      }

      const instance = this.userRepository.create({
        id,
        ...updateInstructorDto,
      });

      await this.userRepository.save(instance);

      const instructor = await this.userRepository.findOne({
        relations: {
          instructor: {
            educationPlace: true,
            educationField: true,
            educationLevel: true,
          },
          state: true,
        },
        where: {
          id,
        },
      });

      return {
        instructor,
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('email')) {
          throw new ConflictException('Email address already exists');
        } else if (err.detail.includes('phoneNumber')) {
          throw new ConflictException('Phone number already exists');
        }
      }
      throw err;
    }
  }
}
