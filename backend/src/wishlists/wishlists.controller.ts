import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}
  @UseGuards(JwtGuard)
  @Post('')
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }
  @UseGuards(JwtGuard)
  @Get('')
  public async findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req,
  ) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new NotFoundException();
    }
    if (req.user.id === wishlist.owner.id) {
      return await this.wishlistsService.updateOne(+id, updateWishlistDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new NotFoundException();
    }
    if (req.user.id === wishlist.owner.id) {
      await this.wishlistsService.removeOne(+id);
      return wishlist;
    } else {
      throw new ForbiddenException();
    }
  }
}
