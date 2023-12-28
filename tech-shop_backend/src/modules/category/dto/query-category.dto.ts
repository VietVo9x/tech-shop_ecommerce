import { Transform } from 'class-transformer';
import { IsInt, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class GetAllCategoryDTO {
  @IsOptional()
  search_name?: string;

  @IsOptional()
  order?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsInt()
  delete?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  status?: boolean;
}
