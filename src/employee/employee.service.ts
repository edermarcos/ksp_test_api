import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { handleDBExceptions } from '../common/helpers/index';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const entity = this.employeesRepository.create(createEmployeeDto);
      await this.employeesRepository.save(entity);

      return entity;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const [entities, count] = await this.employeesRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      pagination: {
        limit,
        offset,
        pages: Math.ceil(count / limit) || 0,
      },
      entities,
    };
  }

  async findOne(id: string) {
    const entity = await this.employeesRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const entity = await this.employeesRepository.preload({
      id,
      ...updateEmployeeDto,
    });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.employeesRepository.save(entity);
  }

  async remove(id: string) {
    return await this.employeesRepository.delete(id);
  }
}
