import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user.entity';
import {
  ObjectState,
  RoleType,
} from 'src/app/features/data-lookup/enums/data-lookup.enum';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dtos/sign-up.dto';
import { Role } from 'src/app/entities/role.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
    private readonly jwtService: JwtService,
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
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async signup(signUpDto: SignUpDto) {
    try {
      const role = (await this.roleRepository.findOneBy({
        type: {
          value: RoleType.USER,
        },
      })) as unknown as Role;

      const state = (await this.dataLookupRepository.findOneBy({
        value: ObjectState.ACTIVE,
      })) as unknown as DataLookup;

      const password = await bcrypt.hash(signUpDto.password, 10);

      const instance = this.userRepository.create({
        ...signUpDto,
        password,
        role,
        state,
      });
      const result = await this.userRepository.save(instance);

      const user = (await this.userRepository.findOne({
        where: {
          id: result.id,
        },
      })) as unknown as User;

      return {
        user,
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('email')) {
          throw new ConflictException('Email address already exists');
        }
      }
      throw err;
    }
  }

  private async verifyPassword(canidatePassword: string, userPassword: string) {
    return await bcrypt.compare(canidatePassword, userPassword);
  }
}
