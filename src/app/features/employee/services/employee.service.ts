import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [employees, total] = await this.userRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      employees,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const employee = await this.userRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} does not exist`);
    }
    return {
      employee,
    };
  }

  async create(createUserDto: CreateEmployeeDto) {
    try {
      const nanoid = customAlphabet(alphanumeric, 8);
      const random = await nanoid();

      const password = await bcrypt.hash(random, 10);

      const instance = this.userRepository.create({
        ...createUserDto,
        password,
      });

      const result = await this.userRepository.save(instance);

      const employee = await this.userRepository.findOne({
        relations: { state: true },
        where: {
          id: result.id,
        },
      });

      return {
        employee,
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

  async update(id: string, updateUserDto: UpdateEmployeeDto) {
    try {
      const result = await this.userRepository.update(id, updateUserDto);

      if (result.affected === 0) {
        throw new NotFoundException(`Employee with id ${id} does not exist`);
      }

      const employee = await this.userRepository.findOne({
        relations: {
          state: true,
        },
        where: {
          id,
        },
      });

      return {
        employee,
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
