import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsNotEmpty()
  @MaxLength(255)
  image: string;
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  @IsPositive()
  total_price: number;
  @IsNotEmpty()
  orderId: number;
}
