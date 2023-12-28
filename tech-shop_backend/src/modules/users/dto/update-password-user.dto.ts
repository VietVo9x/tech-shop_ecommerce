import { Length } from 'class-validator';

export class UpdatePasswordUserDto {
  @Length(8, 20)
  oldPassword: string;
  @Length(8, 20)
  newPassword: string;
}
