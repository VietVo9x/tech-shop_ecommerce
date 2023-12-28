import { OrderEntity } from '../entity/orders.entity';

export interface Orders_Res {
  total: number;
  orders: OrderEntity[];
}
