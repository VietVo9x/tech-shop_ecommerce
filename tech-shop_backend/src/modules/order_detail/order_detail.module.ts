import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailRepository } from './order_detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, OrderDetailRepository],
  exports: [OrderDetailRepository],
})
export class OrderDetailModule {}
