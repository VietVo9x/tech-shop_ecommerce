import { IsNotEmpty, IsNumber, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  user_name: string;
  @IsNotEmpty()
  @MaxLength(255)
  comment: string;
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;
  @IsNotEmpty()
  @MaxLength(255)
  image_user: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
}
