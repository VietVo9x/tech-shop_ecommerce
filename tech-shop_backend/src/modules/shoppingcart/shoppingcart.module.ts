import { Module } from '@nestjs/common';
import { ShoppingcartController } from './shoppingcart.controller';
import { ShoppingcartService } from './shoppingcart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entity/shopping-cart.entity';
import { ProductEntity } from '../products/entity/products.entiy';
import { ImageEntity } from '../imagesproduct/entity/imagesproduct.entity';
import { ShoppingCartRepository } from './shoppingcart.repository';
import { ProductsRepository } from '../products/products.repository';
import { UserRepository } from '../users/users.repository';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartEntity, ProductEntity, ImageEntity, User])],
  controllers: [ShoppingcartController],
  providers: [ShoppingcartService, ShoppingCartRepository, ProductsRepository, UserRepository],
  exports: [ShoppingCartRepository],
})
export class ShoppingcartModule {}
