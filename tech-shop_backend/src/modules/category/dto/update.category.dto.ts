import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateCategoryDTO } from './category.dto';
import { Transform } from 'class-transformer';

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}
