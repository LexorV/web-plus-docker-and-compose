import { IsEmail, Length, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30)
  username: string;
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Length(2, 200)
  @IsOptional()
  about: string;
  @IsOptional()
  avatar: string;
}
