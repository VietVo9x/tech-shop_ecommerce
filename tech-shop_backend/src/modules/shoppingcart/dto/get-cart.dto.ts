import { Transform } from 'class-transformer';
import { DeleteAllCartDto } from './delete-all-cart.dto';

export class GetCartDto {
  @Transform(({ value }) => Number(value))
  userId: number;
}
