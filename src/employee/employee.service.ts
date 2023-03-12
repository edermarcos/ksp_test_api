import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { handleDBExceptions } from '../common/helpers/index';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  private async deleteTable(): Promise<void> {
    try {
      await this.employeesRepository
        .createQueryBuilder()
        .delete()
        .where({})
        .execute();
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  private createRandomEmployee(): Partial<Employee> {
    const positions = [
      'Computer Systems Analyst',
      'Computer Programmer',
      'Software Developer',
      'Software Engineer',
      'Web Developer',
      'Web Designer',
      'Database Administrator',
      'Network Administrator',
      'Network Architect',
      'Network Engineer',
      'Network Security Engineer',
    ];
    const salaries = [
      20000, 26500, 32000, 36000, 40000, 32600, 22000, 27000, 41900,
    ];
    return {
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      position: faker.helpers.arrayElement(positions),
      salary: faker.helpers.arrayElement(salaries),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    };
  }

  populate() {
    this.deleteTable();
    const employees = Array.from({ length: 10 }).map(() =>
      this.createRandomEmployee(),
    );
    this.employeesRepository.save(employees);

    return 'Employees populated';
  }

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
    const { limit = 20, offset = 0 } = pagination;
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
      entities: entities.sort((a: Employee, b: Employee) =>
        a.fullName.localeCompare(b.fullName),
      ),
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
