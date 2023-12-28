import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/orders.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders_Res } from './respone-interface/all-order';
import { ShippingAddressEntity } from '../shipping_address/entities/shipping_address.entity';

export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderDB: Repository<OrderEntity>,
  ) {}
  async findAllOrder(searchConditions: any): Promise<Orders_Res> {
    try {
      const { where, order, skip, take } = searchConditions;
      const total = await this.orderDB.count({ where });
      const orders = await this.orderDB.find({
        relations: { orderDetails: true, shippingAddress: true },
        where,
        take,
        skip,
        order,
      });
      return { orders: orders, total: total };
    } catch (error) {
      throw error;
    }
  }
  async findById(id: number): Promise<OrderEntity> {
    try {
      return await this.orderDB.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async findAllOrderByUser(userId: number): Promise<OrderEntity[]> {
    try {
      return await this.orderDB.find({
        relations: { orderDetails: true, shippingAddress: true },
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async insertOrder(model: CreateOrderDto, transactionEntity?: EntityManager) {
    try {
      if (transactionEntity) return await transactionEntity.save(OrderEntity, model);
      return await this.orderDB.save(model);
    } catch (error) {
      throw error;
    }
  }
}
