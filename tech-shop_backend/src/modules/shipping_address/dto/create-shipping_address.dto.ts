import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsNotEmpty()
  @MaxLength(255)
  address: string;
  @IsNotEmpty()
  @MaxLength(255)
  phone: string;
  @IsNotEmpty()
  userId: number;
}
