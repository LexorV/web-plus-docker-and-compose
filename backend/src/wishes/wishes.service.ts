import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(wish: CreateWishDto, user: User) {
    return await this.wishRepository.save({
      ...wish,
      owner: user,
    });
  }
  async findAll() {
    return await this.wishRepository.query(`SELECT * FROM public.wish`);
  }
  async findLast() {
    return await this.wishRepository.find({
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        owner: {
          offers: true,
          wishLists: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }
  async findTop() {
    return await this.wishRepository.find({
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        owner: {
          offers: true,
          wishLists: true,
        },
      },
      order: {
        copied: 'ASC',
      },
      take: 10,
    });
  }

  async findOne(id: number) {
    return await this.wishRepository.findOne({
      where: { id },
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        owner: {
          offers: true,
          wishLists: true,
        },
      },
    });
  }

  async updateOne(id: number, wish: UpdateWishDto) {
    await this.wishRepository.update(id, wish);
    return {};
  }

  async removeOne(id: number) {
    await this.wishRepository.delete({ id });
  }
  public async find(options: FindManyOptions<Wish>) {
    return this.wishRepository.find(options);
  }
}
