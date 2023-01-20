import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateUserSubServiceDto } from '../dtos/create-user-sub-service.dto';
import { UpdateUserSubServiceDto } from '../dtos/update-user-sub-service.dto';
import { UserSubService } from 'src/app/entities/user-sub-service.entity';

@Injectable()
export class UserSubServiceService {
  constructor(
    @InjectRepository(UserSubService)
    private readonly userSubServiceRepository: Repository<UserSubService>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [userSubServices, total] =
      await this.userSubServiceRepository.findAndCount({
        relations: {
          service: true,
          user: true,
          state: true,
        },
        where: filter,
        take,
        skip,
      });
    return {
      userSubServices,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const userSubSerivce = await this.userSubServiceRepository.findOne({
      relations: {
        service: true,
        user: true,
        state: true,
      },
      where: {
        id,
      },
    });
    if (!userSubSerivce) {
      throw new NotFoundException(
        `User sub service with id ${id} does not exist`,
      );
    }
    return {
      userSubSerivce,
    };
  }

  async create(createUserSubServiceDto: CreateUserSubServiceDto) {
    const instance = this.userSubServiceRepository.create(
      createUserSubServiceDto,
    );

    const result = await this.userSubServiceRepository.save(instance);

    const userSubSerivce = await this.userSubServiceRepository.findOne({
      relations: { service: true, user: true, state: true },
      where: {
        id: result.id,
      },
    });

    return {
      userSubSerivce,
    };
  }

  async update(id: string, updateUserSubServiceDto: UpdateUserSubServiceDto) {
    const result = await this.userSubServiceRepository.update(
      id,
      updateUserSubServiceDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `User sub service with id ${id} does not exist`,
      );
    }

    const userSubSerivce = await this.userSubServiceRepository.findOne({
      relations: {
        service: true,
        user: true,
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      userSubSerivce,
    };
  }
}
