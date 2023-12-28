import { IsNotEmpty } from 'class-validator';

export class DeleteAllCartDto {
  @IsNotEmpty()
  userId: number;
}
