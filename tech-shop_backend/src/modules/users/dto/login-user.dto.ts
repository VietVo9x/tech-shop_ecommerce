import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(100)
  email: string;
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
