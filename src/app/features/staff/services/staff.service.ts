import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';
import { MailService } from 'src/app/shared/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [staffs, total] = await this.userRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      staffs,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const staff = await this.userRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!staff) {
      throw new NotFoundException(`Staff with id ${id} does not exist`);
    }
    return {
      staff,
    };
  }

  async create(createStaffDto: CreateStaffDto) {
    try {
      const nanoid = customAlphabet(alphanumeric, 8);

      const random = (await nanoid()).toUpperCase();

      const password = await bcrypt.hash(random, 10);

      const instance = this.userRepository.create({
        ...createStaffDto,
        password,
      });

      const result = await this.userRepository.save(instance);

      const staff = (await this.userRepository.findOne({
        relations: { state: true },
        where: {
          id: result.id,
        },
      })) as User;

      this.mailService.sendPasswordEmail({
        to: staff.email,
        name: `${staff.firstName} ${staff.lastName}`,
        password: random,
        link: this.configService.get<string>('STAFF_LOGIN_URL') as string,
      });

      return {
        staff,
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

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    try {
      const result = await this.userRepository.update(id, updateStaffDto);

      if (result.affected === 0) {
        throw new NotFoundException(`Staff with id ${id} does not exist`);
      }

      const staff = await this.userRepository.findOne({
        relations: {
          state: true,
        },
        where: {
          id,
        },
      });

      return {
        staff,
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
