import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entity/products.entiy';
import { User } from '../users/entity/user.entity';
import { ReviewEntity } from './entity/reviews.entity';
import { UserRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';
import { ImagesProductRepository } from '../imagesproduct/imagesproduct.repository';
import { ImageEntity } from '../imagesproduct/entity/imagesproduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, User, ReviewEntity, ImageEntity])],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    ReviewRepository,
    UserRepository,
    ProductsRepository,
    ImagesProductRepository,
  ],
})
export class ReviewsModule {}
