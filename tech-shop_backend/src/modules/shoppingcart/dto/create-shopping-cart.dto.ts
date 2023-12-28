import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateShoppingCartDto {
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
