import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { query } from 'express';
import { QueryReviewsDto } from './dto/query-review.dto';
import { AllReviewEntity } from './entity/join-table.entity';

export class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsDB: Repository<ReviewEntity>,
  ) {}
  async findAll(query: any): Promise<AllReviewEntity> {
    const { where, take, skip } = query;
    try {
      const reviews = await this.reviewsDB.find({
        where,
        take,
        skip,
      });
      const totalReview = await this.reviewsDB.count({ where });
      return {
        total: totalReview,
        reviews: reviews,
      };
    } catch (error) {
      throw error;
    }
  }
  async findById(id: number): Promise<ReviewEntity> {
    try {
      return await this.reviewsDB.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async findByProductId(productId: number): Promise<ReviewEntity[]> {
    try {
      return await this.reviewsDB.find({ where: { productId: productId } });
    } catch (error) {
      throw error;
    }
  }
  async save(reviews: CreateReviewDto): Promise<ReviewEntity> {
    try {
      return await this.reviewsDB.save(reviews);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number) {
    try {
      return await this.reviewsDB.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
