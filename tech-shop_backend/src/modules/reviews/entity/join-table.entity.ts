import { ReviewEntity } from './reviews.entity';

export interface AllReviewEntity {
  total: number;
  reviews: ReviewEntity[];
}
