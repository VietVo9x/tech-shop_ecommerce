import { IsEmail, MaxLength } from 'class-validator';

export class SendMailDTO {
  @IsEmail()
  @MaxLength(50)
  email: string;
}
