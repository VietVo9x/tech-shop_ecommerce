import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SoftDeleteDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isDelete: boolean;
}
