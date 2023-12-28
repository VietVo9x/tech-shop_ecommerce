import { Transform } from 'class-transformer';

export class RestoreProductDto {
  @Transform(({ value }) => value === 'true')
  isDelete: boolean;
}
