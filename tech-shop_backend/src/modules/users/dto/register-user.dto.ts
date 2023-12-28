import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  user_name: string;
  @IsEmail()
  @MaxLength(50)
  email: string;
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  status: boolean = true;
  @IsNotEmpty()
  @IsNumber()
  role: number = 0;
}
