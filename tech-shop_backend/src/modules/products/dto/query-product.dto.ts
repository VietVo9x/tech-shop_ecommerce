import { Transform } from 'class-transformer';

export class QueryProductDto {
  @Transform(({ value }) => Number(value))
  page: number = 1;
  @Transform(({ value }) => Number(value))
  limit: number = 10;
  search_name: string = '';
  @Transform(({ value }) => Number(value))
  category: number;
  sort: string = '';
  @Transform(({ value }) => value.toUpperCase())
  order: string = '';
}
