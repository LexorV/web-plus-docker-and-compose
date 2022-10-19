import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { EmailSender } from '../emailSender/emailSender.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
    private emailSender: EmailSender,
  ) {}

  async create(user: User, offer: CreateOfferDto) {
    const wish = await this.wishesService.findOne(offer.itemId);
    if (user.id === wish.owner.id) {
      throw new BadRequestException('Нельзя скидываться себе на подарки');
    }
    if (wish.raised + offer.amount > wish.price) {
      throw new BadRequestException('Слишком большая сумма.');
    }
    if (wish.owner.id === user.id) {
      throw new BadRequestException('Нельзя скидываться на свои подарки');
    }
    const { raised, ...resWish } = wish;
    await this.wishesService.updateOne(wish.id, {
      raised: wish.raised + offer.amount,
      ...resWish,
    });
    if (wish.raised === wish.price) {
      const usersMails = wish.offers.map((e) => {
        return e.user.email;
      });
      await this.emailSender.sendEmail(usersMails, wish.link);
      return;
    }
    return this.offerRepository.save({
      ...offer,
      user: user,
      item: wish,
    });
  }

  async findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
  findAll() {
    return this.offerRepository.find({ relations: ['item', 'user'] });
  }

  async removeOne(id: number) {
    await this.offerRepository.delete({ id });
  }
}
