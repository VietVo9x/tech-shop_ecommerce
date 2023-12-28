import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewsDto } from './dto/query-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Get()
  async getAll(@Query() query: QueryReviewsDto) {
    try {
      return await this.reviewsService.findAll(query);
    } catch (error) {
      throw error;
    }
  }
  @Get('id')
  async getById(@Param('id') id: number) {
    try {
      return await this.reviewsService.findById(id);
    } catch (error) {
      throw error;
    }
  }
  @Post()
  async insert(@Body() createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewsService.insert(createReviewDto);
    } catch (error) {
      throw error;
    }
  }
  @Delete('id')
  remove() {}
  @Get('by-product/:id')
  async reviewsByProductId(@Param('id') id: number) {
    try {
      return await this.reviewsService.findByProductId(id);
    } catch (error) {
      throw error;
    }
  }
}
