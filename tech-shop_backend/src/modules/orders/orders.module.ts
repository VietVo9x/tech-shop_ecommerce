import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddressEntity } from '../shipping_address/entities/shipping_address.entity';
import { OrderDetailEntity } from '../order_detail/entities/order_detail.entity';
import { OrderEntity } from './entity/orders.entity';
import { ShoppingCartEntity } from '../shoppingcart/entity/shopping-cart.entity';
import { ProductEntity } from '../products/entity/products.entiy';
import { ShippingAddressRepository } from '../shipping_address/shipping_address.repository';
import { OrderDetailRepository } from '../order_detail/order_detail.repository';
import { ShoppingCartRepository } from '../shoppingcart/shoppingcart.repository';
import { ProductsRepository } from '../products/products.repository';
import { ImagesProductRepository } from '../imagesproduct/imagesproduct.repository';
import { ImageEntity } from '../imagesproduct/entity/imagesproduct.entity';
import { OrderRepository } from './orders.repository';
import { User } from '../users/entity/user.entity';
import { UserRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShippingAddressEntity,
      OrderDetailEntity,
      OrderEntity,
      ShoppingCartEntity,
      ProductEntity,
      ImageEntity,
      User,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ShippingAddressRepository,
    OrderDetailRepository,
    ShoppingCartRepository,
    ProductsRepository,
    OrderRepository,
    UserRepository,
  ],
})
export class OrdersModule {}
