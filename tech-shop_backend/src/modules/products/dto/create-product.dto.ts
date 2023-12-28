import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  product_name: string;
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be number & decimal precision 2' })
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  quantity_stock: number;
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number;

  @Transform(({ value }) => value === 'true')
  status: boolean = true;

  @Transform(({ value }) => value === 'true')
  isDelete: boolean = false;
}
