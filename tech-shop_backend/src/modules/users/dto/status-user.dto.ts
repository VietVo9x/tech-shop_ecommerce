import { Transform } from 'class-transformer';

export class StatusUserDto {
  @Transform(({ value }) => value === 'true')
  status: boolean = true;
}
