import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/index.dto';
import { handleDBExceptions } from 'src/common/helpers';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const entity = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(entity);

      return entity;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const [entities, count] = await this.usersRepository.findAndCount({
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
    const entity = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(entity);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return entity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
