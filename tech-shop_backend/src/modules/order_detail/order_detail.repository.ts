import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order_detail.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';

export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailDB: Repository<OrderDetailEntity>,
  ) {}
  async insert(
    createOrderDetailDto: CreateOrderDetailDto,
    transactionEntity?: EntityManager,
  ): Promise<OrderDetailEntity> {
    try {
      if (transactionEntity)
        return await transactionEntity.save(OrderDetailEntity, createOrderDetailDto);
      return await this.orderDetailDB.save(createOrderDetailDto);
    } catch (error) {
      throw error;
    }
  }
}
