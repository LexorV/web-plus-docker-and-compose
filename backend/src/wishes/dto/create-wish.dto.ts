import { IsUrl, Length, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateWishDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;
  @IsNotEmpty()
  @IsUrl()
  link: string;
  @IsNotEmpty()
  @IsUrl()
  image: string;
  @IsNotEmpty()
  price: number;

  copied: number;

  description: string;
  @IsOptional()
  raised: number;
}
