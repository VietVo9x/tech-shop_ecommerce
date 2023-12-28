import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  status: boolean = true;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isDelete: boolean = false;
}
