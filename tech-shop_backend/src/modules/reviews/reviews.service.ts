import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Message_Res } from 'src/utils/message.res';
import { ProductsRepository } from '../products/products.repository';
import { UserRepository } from '../users/users.repository';
import { QueryReviewsDto } from './dto/query-review.dto';
import { Like } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewRepository,
    private readonly productRepository: ProductsRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async findAll(query: QueryReviewsDto) {
    try {
      const pageNumber = query.page;
      const perPage = query.limit;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {},
        order: {},
        take: perPage,
        skip: offset,
      };
      if (query.user_name) {
        searchConditions.where.user_name = Like(`%${query.user_name}%`);
      }
      return await this.reviewsRepository.findAll(query);
    } catch (error) {
      throw error;
    }
  }
  async findById(id: number) {
    try {
      return await this.reviewsRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByProductId(productId: number) {
    try {
      return await this.reviewsRepository.findByProductId(productId);
    } catch (error) {
      throw error;
    }
  }
  async insert(createReviewDto: CreateReviewDto): Promise<Message_Res> {
    const product = await this.productRepository.findProductById(createReviewDto.productId);
    if (!product) throw new NotFoundException('Product not found');
    const user = await this.userRepository.findUserById(createReviewDto.userId);
    if (!user) throw new NotFoundException('User not found');
    if (user.user_name !== createReviewDto.user_name) throw new NotFoundException('User not found');
    try {
      await this.reviewsRepository.save(createReviewDto);
      return {
        message: 'Insert review successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number): Promise<Message_Res> {
    try {
      await this.reviewsRepository.delete(id);
      return {
        message: 'Delete review successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
