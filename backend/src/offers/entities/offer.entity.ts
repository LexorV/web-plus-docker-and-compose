import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../shared/entity/BaseEntity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsNumber } from 'class-validator';
@Entity()
export class Offer extends BaseEntity {
  @Column()
  @IsNumber()
  amount: number;
  @Column({
    default: false,
  })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.id)
  item: Wish;
}
