import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, Wishlist: CreateWishlistDto) {
    await console.log(Wishlist);
    const wishes = await this.wishesService.find({
      where: { id: In(Wishlist.itemsId || []) },
    });
    const newWishList = await this.wishListRepository.create({
      ...Wishlist,
      owner: user,
      items: wishes,
    });
    //await console.log(newWishList);
    return await this.wishListRepository.save(newWishList);
  }
  async findAll() {
    return this.wishListRepository.find({ relations: ['owner', 'items'] });
  }

  async findOne(id: number) {
    return this.wishListRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
  }

  async updateOne(id: number, wishlist: UpdateWishlistDto) {
    await this.wishListRepository.update(id, wishlist);

    return this.findOne(+id);
  }

  async removeOne(id: number) {
    return await this.wishListRepository.delete(id);
  }
}
