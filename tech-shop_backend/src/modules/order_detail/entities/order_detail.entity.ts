import { OrderEntity } from 'src/modules/orders/entity/orders.entity';
import { ProductEntity } from 'src/modules/products/entity/products.entiy';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_detail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @Column()
  quantity: number;
  @Column()
  productId: number;
  @Column()
  total_price: number;

  @Column()
  orderId: number;
  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
