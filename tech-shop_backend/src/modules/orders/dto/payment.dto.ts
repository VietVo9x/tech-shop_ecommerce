import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ProductDTO {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  image: string;

  @IsInt()
  quantity: number;

  @IsNotEmpty()
  productId: number;

  @IsInt()
  total_price: number;
}
export class ShippingAddressDTO {
  @IsNotEmpty()
  id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @MaxLength(255)
  phone: string;

  @IsOptional()
  userId?: number;
}
export class OrderRequestDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  cart: ProductDTO[];

  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shippingAddress: ShippingAddressDTO;
}
