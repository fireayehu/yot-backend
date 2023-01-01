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
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';
import { MailService } from 'src/app/shared/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
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
    const [users, total] = await this.userRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      users,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return {
      user,
    };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const role = (await this.roleRepository.findOneBy({
        type: {
          value: RoleType.USER,
        },
      })) as Role;
      const nanoid = customAlphabet(alphanumeric, 8);
      const random = await nanoid();

      const password = await bcrypt.hash(random, 10);

      const instance = this.userRepository.create({
        ...createUserDto,
        role,
        password,
      });

      const result = await this.userRepository.save(instance);

      const user = (await this.userRepository.findOne({
        relations: { state: true },
        where: {
          id: result.id,
        },
      })) as unknown as User;

      this.mailService.sendPasswordEmail({
        to: user.email,
        name: `${user.firstName} ${user.lastName}`,
        password: random,
        link: this.configService.get<string>('USER_LOGIN_URL') as string,
      });

      return {
        user,
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userRepository.update(id, updateUserDto);

      if (result.affected === 0) {
        throw new NotFoundException(`User with id ${id} does not exist`);
      }

      const user = await this.userRepository.findOne({
        relations: {
          state: true,
        },
        where: {
          id,
        },
      });

      return {
        user,
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
