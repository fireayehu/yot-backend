import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import {
  ObjectState,
  RoleType,
} from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
        role: {
          type: {
            value: RoleType.USER,
          },
        },
        state: {
          value: ObjectState.ACTIVE,
        },
      },
    });

    if (
      !user ||
      !(await this.verifyPassword(loginDto.password, user.password))
    ) {
      throw new NotFoundException('Incorrect email or password');
    }

    return {
      user,
    };
  }

  private async verifyPassword(canidatePassword: string, userPassword: string) {
    return await bcrypt.compare(canidatePassword, userPassword);
  }
}
