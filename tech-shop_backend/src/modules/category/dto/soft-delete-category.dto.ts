import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CategorySoftDeleteDto {
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isDelete: boolean;
}
