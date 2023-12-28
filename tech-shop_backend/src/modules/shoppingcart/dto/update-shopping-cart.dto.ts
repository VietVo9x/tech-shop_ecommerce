import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateShoppingCartDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}
