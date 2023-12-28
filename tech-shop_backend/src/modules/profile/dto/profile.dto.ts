import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class InfoProfileDTO {
  @MaxLength(50)
  user_name: string;
  @MaxLength(50)
  full_name: string;

  @MaxLength(10)
  phone: string;
}
