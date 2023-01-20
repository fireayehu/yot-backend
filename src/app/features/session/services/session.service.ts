import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { UpdateSessionDto } from '../dtos/update-session.dto';
import { Session } from 'src/app/entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [sessions, total] = await this.sessionRepository.findAndCount({
      relations: {
        course: true,
        instructor: true,
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      sessions,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const session = await this.sessionRepository.findOne({
      relations: {
        course: true,
        instructor: true,
        state: true,
      },
      where: {
        id,
      },
    });
    if (!session) {
      throw new NotFoundException(`Session with id ${id} does not exist`);
    }
    return {
      session,
    };
  }

  async create(createSessionDto: CreateSessionDto) {
    const instance = this.sessionRepository.create(createSessionDto);

    const result = await this.sessionRepository.save(instance);

    const session = await this.sessionRepository.findOne({
      relations: { course: true, instructor: true, state: true },
      where: {
        id: result.id,
      },
    });

    return {
      session,
    };
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const result = await this.sessionRepository.update(id, updateSessionDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Session with id ${id} does not exist`);
    }

    const session = await this.sessionRepository.findOne({
      relations: {
        course: true,
        instructor: true,
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      session,
    };
  }
}
