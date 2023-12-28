import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class BlockCategoryDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  status: boolean = true;
}
