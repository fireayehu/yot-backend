import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Repository } from 'typeorm';
import { CreateContactUsDto } from '../dtos/create-contact-us.dto';
import { ContactUs } from 'src/app/entities/contact-us.entity';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { ObjectState } from '../../data-lookup/enums/data-lookup.enum';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
    @InjectRepository(DataLookup)
    private readonly dataLookupRepository: Repository<DataLookup>,
  ) {}
  async findAll(filter: IFilter | IFilter[], page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [contacts, total] = await this.contactUsRepository.findAndCount({
      relations: {
        state: true,
      },
      where: filter,
      take,
      skip,
    });
    return {
      contacts,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: string) {
    const contact = await this.contactUsRepository.findOne({
      relations: {
        state: true,
      },
      where: {
        id,
      },
    });
    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} does not exist`);
    }
    return {
      contact,
    };
  }

  async create(createContactUsDto: CreateContactUsDto) {
    const state = (await this.dataLookupRepository.findOneBy({
      value: ObjectState.ACTIVE,
    })) as DataLookup;

    const instance = this.contactUsRepository.create({
      ...createContactUsDto,
      state,
    });

    const result = await this.contactUsRepository.save(instance);

    const contact = await this.contactUsRepository.findOne({
      relations: { state: true },
      where: {
        id: result.id,
      },
    });

    return {
      contact,
    };
  }
}
