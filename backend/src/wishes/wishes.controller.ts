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
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from '../users/users.service';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}
  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Post('')
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') idWish: string, @Req() req) {
    const { id, copied, ...res } = await this.wishesService.findOne(+idWish);
    const newCopied = copied + 1;
    await this.wishesService.updateOne(id, { copied: newCopied, ...res });
    return await this.wishesService.create(
      { copied: 0, raised: 0, ...res },
      req.user,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new NotFoundException();
    }
    if (req.user.id === wish.owner.id) {
      return this.wishesService.updateOne(+id, updateWishDto);
    } else {
      new ForbiddenException();
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const wish = await this.wishesService.findOne(+id);
    if (!wish) {
      throw new NotFoundException();
    } else if (req.user.id === wish.owner.id) {
      await this.wishesService.removeOne(+id);
      return wish;
    } else {
      throw new ForbiddenException();
    }
  }
}
