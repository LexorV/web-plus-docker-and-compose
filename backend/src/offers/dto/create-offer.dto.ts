import { IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  public amount: number;

  @IsOptional()
  @IsBoolean()
  public hidden: boolean;

  @IsNumber()
  public itemId: number;
}
