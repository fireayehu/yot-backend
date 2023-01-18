import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from '../dtos/create-language.dto';
import { UpdateLanguageDto } from '../dtos/update-language.dto';
import { Language } from 'src/app/entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [languages, total] = await this.languageRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      languages,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const language = await this.languageRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!language) {
      throw new NotFoundException(`Language with id ${id} does not exist`);
    }
    return {
      language,
    };
  }

  async create(createLanguageDto: CreateLanguageDto) {
    const instance = this.languageRepository.create(createLanguageDto);

    const result = await this.languageRepository.save(instance);

    const language = await this.languageRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      language,
    };
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto) {
    const result = await this.languageRepository.update(id, updateLanguageDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Language with id ${id} does not exist`);
    }

    const language = await this.languageRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });

    return {
      language,
    };
  }
}
