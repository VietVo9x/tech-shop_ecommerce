import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;
  @Transform(({ value }) => value === 'true')
  status: boolean;
  @IsNotEmpty()
  all_price: number;
  @IsNotEmpty()
  shippingAddressId: number;
}
