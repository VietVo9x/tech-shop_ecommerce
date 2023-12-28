import { Transform } from 'class-transformer';

export class UpdateStatusOrderDto {
  @Transform(({ value }) => value === 'true')
  status: boolean;
}
