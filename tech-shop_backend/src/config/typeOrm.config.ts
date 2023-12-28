import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CategoryEntity } from 'src/modules/category/entity/category.entity';
import { ImageEntity } from 'src/modules/imagesproduct/entity/imagesproduct.entity';
import { OrderDetailEntity } from 'src/modules/order_detail/entities/order_detail.entity';
import { OrderEntity } from 'src/modules/orders/entity/orders.entity';
import { ProductEntity } from 'src/modules/products/entity/products.entiy';
import { Profile } from 'src/modules/profile/entity/profile.entity';
import { ReviewEntity } from 'src/modules/reviews/entity/reviews.entity';
import { ShippingAddressEntity } from 'src/modules/shipping_address/entities/shipping_address.entity';
import { ShoppingCartEntity } from 'src/modules/shoppingcart/entity/shopping-cart.entity';
import { User } from 'src/modules/users/entity/user.entity';
config();

const typeOrmConfig: TypeOrmModuleOptions = {
  host: process.env.DB_HOST,
  port: 3307,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: 'mysql',
  database: process.env.DB_DBNAME,
  entities: [
    User,
    Profile,
    CategoryEntity,
    ProductEntity,
    ImageEntity,
    ReviewEntity,
    ShoppingCartEntity,
    OrderDetailEntity,
    OrderEntity,
    ShippingAddressEntity,
  ],
  synchronize: false,
};

export default typeOrmConfig;
