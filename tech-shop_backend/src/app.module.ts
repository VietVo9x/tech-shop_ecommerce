import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeOrm.config';
import { ProfileModule } from './modules/profile/profile.module';
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './modules/category/category.module';
import { ProductsModule } from './modules/products/products.module';
import { ShoppingcartModule } from './modules/shoppingcart/shoppingcart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ShoppingcartController } from './modules/shoppingcart/shoppingcart.controller';
import { OrderDetailModule } from './modules/order_detail/order_detail.module';
import { ShippingAddressModule } from './modules/shipping_address/shipping_address.module';
import { OrdersController } from './modules/orders/orders.controller';
import { ProfileController } from './modules/profile/profile.controller';
import { CategoryController } from './modules/category/category.controller';
import { UsersController } from './modules/users/users.controller';
import { ReviewsController } from './modules/reviews/reviews.controller';
import { ProductsController } from './modules/products/products.controller';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),

    UsersModule,
    ProfileModule,
    UploadFileModule,
    CategoryModule,
    ProductsModule,
    ShoppingcartModule,
    OrdersModule,
    ReviewsModule,
    FeedbackModule,
    OrdersModule,
    OrderDetailModule,
    ShippingAddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'category', method: RequestMethod.GET },
        { path: 'products/all', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.GET },
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes(
        ShoppingcartController,
        OrdersController,
        ProfileController,
        CategoryController,
        UsersController,
        ProductsController,
      );
  }
}
